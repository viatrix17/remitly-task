import app from './app';
import { checkConnection } from './Infrastructure/db';

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await checkConnection();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

start();