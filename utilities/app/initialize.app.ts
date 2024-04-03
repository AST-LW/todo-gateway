import { Express } from "express";

// Define a function for initializing and starting the Express application
export const initializeApp = async (app: Express) => {
    try {
        // Create an HTTP server and listen on the specified port from environment variables
        const server = app.listen(process.env.PORT, () => {
            console.log(`Server started at port - ${process.env.PORT}`);
        });

        // Gracefully handle SIGTERM signal to close the server before exiting
        process.on("SIGTERM", () => {
            server.close(() => {
                // Exit the process with a status code of 0 (success)
                process.exit(0);
            });
        });
    } catch (error) {
        // If an error occurs during initialization, exit the process with a non-zero status code
        process.exit(-1);
    }
};
