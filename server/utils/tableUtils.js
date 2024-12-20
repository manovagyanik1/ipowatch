/**
 * Find the IPO table in the document by looking for specific header content
 */
export const findIpoTable = ($) => {
  return $('table').filter((i, el) => {
    const firstRow = $(el).find('tr').first();
    const headerText = firstRow.text().toLowerCase();
    return (headerText.includes('latest ipos') || headerText.includes('current ipos')) && 
           headerText.includes('gmp');
  });
};

/**
 * Extract header indices from the first row of the table
 */
export const extractHeaderIndices = ($, headerRow) => {
  const headers = {};
  const headerTexts = [];
  
  $(headerRow).find('td').each((index, cell) => {
    const headerText = $(cell).text().trim().toLowerCase();
    headerTexts.push(headerText);
    
    switch (headerText) {
      case 'latest ipos':
      case 'current ipos':
        headers.COMPANY = index;
        break;
      case 'ipo gmp':
        headers.GMP = index;
        break;
      case 'ipo price':
      case 'price':
        headers.PRICE = index;
        break;
      case 'gain':
        headers.GAIN = index;
        break;
      case 'date':
        headers.DATE = index;
        break;
      case 'kostak':
        headers.KOSTAK = index;
        break;
      case 'subject':
        headers.SUBJECT = index;
        break;
      case 'type':
        headers.TYPE = index;
        break;
    }
  });
  
  if (!headers.COMPANY || !headers.GMP) {
    console.error('Missing required headers. Found headers:', headerTexts);
  }
  
  return headers;
};