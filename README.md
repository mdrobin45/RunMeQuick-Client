
## RumMeQuick Frontend

This is the frontend of `RunMeQuick` project. You will find the backend [here](https://github.com/mdrobin45/RunMeQuick-Server)
## Run Locally

Clone the project

```bash
git clone https://github.com/mdrobin45/RunMeQuick-Client.git
```

Go to the project directory

```bash
cd RunMeQuick-Client
```

Install dependencies

```bash
npm install
```


#### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

`VITE_SERVER_API`

For easier to setup environment variables, you can just rename `.env.development` file to `.env` from root of the project directory.

**Please Note:** You may need to edit `VITE_SERVER_API` from `.env.development` file base on your port of running server.

#### Start Server

Open project folder in terminal and run following command

```bash
npm run dev
```
## Used Technology

**Technologies:** React, React Router Dom v6, TailwindCSS