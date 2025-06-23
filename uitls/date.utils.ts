export enum dateFormat {
    YYYYMMDD = 'YYYYMMDD',
    MMDDYYYY = 'MMDDYYYY',
    DDMMYYYY = 'DDMMYYYY',
    'MM/DD/YYYY' = "MM/DD/YYYY",
    'DD-MM-YYYY' = "DD-MM-YYYY",
    'DD-MMM-YYYY' = "DD-MMM-YYYY"

}

export async function formatDate(date: Date, dateFormat): Promise<string> {
    const monthsFullName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthsShortName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    let formattedDate = ''; //= dateFormat.replace('YYYY', year).replace('MMMM', monthsFullName[month]).replace('MMM', monthsShortName[month]).replace('MM', month+1).replace("DD", day);

    switch (dateFormat) {
        case dateFormat.YYYYMMDD:
            formattedDate = `${year}${(month + 1).toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
            break;
        case dateFormat.MMDDYYYY:
            formattedDate = `${(month + 1).toString().padStart(2, '0')}${day.toString().padStart(2, '0')}${year}`;
            break;
        case dateFormat.DDMMYYYY:
            formattedDate = `${day.toString().padStart(2, '0')}-${(month + 1).toString().padStart(2, '0')}-${year}`;
            break;
        case "DD-MMM-YYYY":
            formattedDate = `${day.toString().padStart(2, '0')}-${(monthsShortName[month]).toString().padStart(2, '0')}-${year}`;
            break;
        case "MM/DD/YYYY":
            formattedDate = `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
            break;
        default:
            formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
    return formattedDate;
}