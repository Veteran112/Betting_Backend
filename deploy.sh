# echo "Stopping..."
# pm2 stop Arbitrage --silent

echo "Installing..."
npm install
echo "Install success"

echo "Running..."
# pm2 start server.js --name ARBITRAGE
pm2 restart ARBITRAGE
echo "All steps success"