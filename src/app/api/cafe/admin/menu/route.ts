import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Interface matching the frontend structure
export interface MenuItem {
  id: string;
  cat: 'Bebidas' | 'Desayunos' | 'Postres';
  nombre: string;
  desc: string;
  precio: number;
  img: string;
  badge?: string;
  disponible?: boolean;
}

// Next.js config for caching
export const revalidate = 30;

// Utility to get authenticated Google Sheets client
async function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;
  if (privateKey) {
    // Remove surrounding quotes if they were loaded literally
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    // Handle newlines in private key string properly
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  if (!email || !privateKey) {
    throw new Error('Google Service Account credentials missing');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const RANGE = 'Menu!A2:H'; // Assuming A=id, B=cat, C=nombre, D=desc, E=precio, F=img, G=badge, H=disponible

// Helper to parse a row into MenuItem
function parseRow(row: any[]): MenuItem {
  return {
    id: row[0] || '',
    cat: row[1] || 'Bebidas',
    nombre: row[2] || '',
    desc: row[3] || '',
    precio: Number(row[4]) || 0,
    img: row[5] || '',
    badge: row[6] || undefined,
    disponible: row[7] === 'FALSE' || row[7] === 'false' ? false : true,
  };
}

export async function GET() {
  try {
    const sheets = await getSheetsClient();
    
    // First, let's make sure the sheet exists and has headers, this is a bit dangerous if it doesn't exist
    // In a real app we might try to create headers if empty, but we'll assume it's created for now
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json([]);
    }

    const items = rows.map(parseRow);
    return NextResponse.json(items);
  } catch (error: any) {
    console.error('Error fetching menu from sheets:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const item: MenuItem = await request.json();
    const sheets = await getSheetsClient();

    // id, cat, nombre, desc, precio, img, badge, disponible
    const newRow = [
      item.id,
      item.cat,
      item.nombre,
      item.desc,
      item.precio,
      item.img,
      item.badge || '',
      item.disponible !== false ? 'TRUE' : 'FALSE'
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Menu!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [newRow],
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const item: MenuItem = await request.json();
    const sheets = await getSheetsClient();

    // First find the row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });
    
    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[0] === item.id);
    
    if (rowIndex === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // A2 is index 0. So rowIndex + 2 gives the actual row number
    const actualRow = rowIndex + 2;
    const updateRange = `Menu!A${actualRow}:H${actualRow}`;
    
    const updateRow = [
      item.id,
      item.cat,
      item.nombre,
      item.desc,
      item.precio,
      item.img,
      item.badge || '',
      item.disponible !== false ? 'TRUE' : 'FALSE'
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: updateRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [updateRow],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }
    
    const sheets = await getSheetsClient();
    
    // Find the row
    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });
    
    const rows = getRes.data.values || [];
    const rowIndex = rows.findIndex(row => row[0] === id);
    
    if (rowIndex === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    // Google Sheets API to delete a row requires batchUpdate with sheetId
    // We need to get the sheetId first (not spreadsheetId)
    const sheetMeta = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });
    
    const menuSheet = sheetMeta.data.sheets?.find(s => s.properties?.title === 'Menu');
    if (!menuSheet?.properties?.sheetId) {
      // Fallback: just clear the row if we can't find sheetId (leaves empty row)
      const actualRow = rowIndex + 2;
      await sheets.spreadsheets.values.clear({
        spreadsheetId: SHEET_ID,
        range: `Menu!A${actualRow}:H${actualRow}`,
      });
      return NextResponse.json({ success: true, method: 'clear' });
    }
    
    const sheetId = menuSheet.properties.sheetId;
    
    // Delete the row properly
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetId,
                dimension: 'ROWS',
                startIndex: rowIndex + 1, // 0-indexed, A1 is row 0, A2 is row 1
                endIndex: rowIndex + 2,
              }
            }
          }
        ]
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
