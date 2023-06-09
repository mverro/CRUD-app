# CRUD-app

API serverless : https://vercel.com/mverro/crud-app-client
API DOC : https://documenter.getpostman.com/view/25641790/2s93sabtkk
Client serverless : https://crud-41yb02u1k-mverro.vercel.app/


This application is deployed on a serverless static server, which means that the upload API function cannot run on the client domain. However, you can try uploading by cloning this repository and running the server locally, and then modify the data fetch URL on the client to the local URL.

To run the application locally, please follow these steps:

Clone the repository: Run the following command in your terminal or command prompt:

>git clone <repository_url>

Navigate to the project directory: Use the following command:

>cd <project_directory>

Install dependencies: Run the following command to install the required dependencies:

>npm install

Start the local server: Execute the following command to start the server locally:

>npm start

Update the fetch URL: In the product.js file in client fetch folder, locate the all function and replace the URL with the local server URL where the data is being served. For example:

const getProductPagination = async (page, limit, callback) => {
  const response = await fetch("http://localhost:8000/api/products?page=" + page + "&limit=" + limit);
  // ...
};

Save the changes and restart the local server if necessary.

By following these steps and running the server locally, you should be able to test the application's upload functionality. Please note that you may need to adjust the port number (8000 in the example above) based on your local server configuration ENV.

============================================  THANKS by Azzam dev ===========================================
