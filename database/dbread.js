const replicateDatabase = require('./dbwrite');

const user = '047edda341b397ad24919b6c95022a68';

const handleReplication = async () => {
    try {
        await replicateDatabase(user);
        console.log('Replication completed successfully');
    } catch (error) {
        console.error('Error during replication:', error);
    }
};

handleReplication();