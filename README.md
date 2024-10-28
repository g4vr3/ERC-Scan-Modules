# ERC Scan Modules - Barcode and QR Code Scanning

This is a web application built with **HTML**, **CSS**, and **JavaScript** for managing and exporting data. The application supports **barcode** and **QR code** scanners (both **1D** and **2D**), which automatically populate the table fields upon scanning, creating new rows dynamically. It is made portable using **Node.js**.

> [!NOTE]
> This application was developed as a **base project** for a final production-ready solution and utilizes **fictitious and test barcode formats**. It was not deployed in production.

## Key Features

- **Automatic Data Entry**: The application is designed to work with pre-configured **barcode** and **QR code** scanners. When a code is scanned, the relevant data is automatically entered into the table, and a new row is created.
- **Dynamic Table Management**: Allows for easy editing, adding, and deleting of rows in the table.
- **Export to Excel**: Quickly export table data to an **Excel** file.
- **Auto-completion**: Columns are filled based on predefined rules when scanning part numbers or serial numbers.
- **Handling of Numeric Data**: Automatically adds an apostrophe (`'`) for numbers starting with `0` to ensure correct formatting in Excel.

## Technologies Used

- **HTML5**: For the structure of the application.
- **CSS3**: Styling and layout responsiveness.
- **JavaScript**: Dynamic functionality and real-time table management.
- **Node.js**: To make the application portable.
- **XLSX.js**: Used for exporting table data to Excel.

## How It Works

1. **Barcode/QR Code Scanning**: The application works with pre-programmed **1D** and **2D** scanners. Upon scanning a code:
   - The table fields are automatically filled according to the data in the code.
   - A new row is generated to allow continuous scanning without manual input.
2. **Manual Editing**: Each table cell is editable, allowing for any necessary adjustments after scanning.
3. **Row Management**: You can delete unwanted rows with the trash icon beside each row.
4. **Data Export**: After filling the table with data, you can export the entire table to an **Excel** file using the **Export to Excel** button.

## Installation

1. Clone the repository from GitHub:
```bash
   git clone https://github.com/your_username/your_repository.git
```

2. Clone the repository from GitHub:
```bash
   cd your_repository
```

3. Install the required dependencies:
```bash
    npm install
```

4. Run the application:
```bash
    npm start
```

## Future Implementations

To enhance the application, the following features could be added in future updates:

- **Database Integration**: Store the scanned data in a database (e.g., MySQL, MongoDB) for better data management and long-term storage.
- **User Authentication**: Implement user authentication to control access and allow different users to manage their data securely.
- **Advanced Sorting/Filtering**: Provide more advanced options for filtering and sorting table data based on different criteria.
- **Batch Data Upload**: Allow users to upload bulk data from external sources, like CSV or Excel files.
- **API Integration**: Enable connectivity to external systems through APIs for real-time data syncing or importing/exporting data.

## Disclaimer

This application was built as a **base prototype** and served as the foundation for a more comprehensive production solution. The **barcode formats** used in this project are **fictitious** and were designed for **testing** and **demonstration purposes only**.

## About the Project

I created this project in **April 2023** with only **basic knowledge of development**. As such, the **structure** and **logic** of the code could be significantly improved in future iterations. This project served as a learning opportunity and foundation for further growth.

## License

© 2023 [g4vr3](https://github.com/g4vr3)
