import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Wallet,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Activity,
  BarChart3,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  Coins,
  Target,
  Award,
  Timer,
  PieChart
} from 'lucide-react';
import {
  getChainInfo,
  formatTimeAgo,
  formatNumber,
  formatSol,
} from '../services/solscanApi';
import './WalletTracker.css';

const WalletTracker = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [chainInfo, setChainInfo] = useState(null);

  // Handle search for contract address
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchAddress.trim()) {
      showErrorToast('Please enter a contract address');
      return;
    }

    // Basic Solana address validation (base58, 32-44 chars)
    if (searchAddress.length < 32 || searchAddress.length > 44) {
      showErrorToast('Invalid Solana contract address');
      return;
    }

    setLoading(true);
    setError(null);
    setChainInfo(null);

    try {
      console.log('Fetching chain info for contract:', searchAddress);
      const data = await getChainInfo();
      console.log('Chain Info Response:', data);
      
      if (data && data.success) {
        setChainInfo(data);
      } else {
        showErrorToast('Failed to fetch chain information. Please check the contract address.');
      }
    } catch (err) {
      showErrorToast('Error fetching chain information');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Show error toast
  const showErrorToast = (message) => {
    setError(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setTimeout(() => setError(null), 300);
    }, 4000);
  };

  // Copy address
  const copyAddress = () => {
    navigator.clipboard.writeText(walletData?.address || searchAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Shorten address for display
  const shortenAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Parse DeFi activity to determine buy/sell
  const parseDefiActivity = (activity) => {
    const routers = activity.routers || [];
    if (routers.length === 0) return null;

    const router = routers[0];
    const SOL_ADDRESS = 'So11111111111111111111111111111111111111112';
    
    let type = 'swap';
    let tokenIn = router.token1_info || {};
    let tokenOut = router.token2_info || {};
    let amountIn = router.amount1 || 0;
    let amountOut = router.amount2 || 0;

    // Determine if it's a buy or sell based on SOL
    if (router.token1 === SOL_ADDRESS) {
      type = 'buy';
      // Bought tokenOut with SOL
    } else if (router.token2 === SOL_ADDRESS) {
      type = 'sell';
      // Sold tokenIn for SOL
    }

    return {
      type,
      tokenIn,
      tokenOut,
      amountIn,
      amountOut,
      platform: activity.platform?.[0] || 'Unknown',
      time: activity.block_time,
      txHash: activity.trans_id,
    };
  };

  // Calculate token P&L from activities
  const calculateTokenPnL = (activities) => {
    const tokenTrades = {};

    activities.forEach(activity => {
      const parsed = parseDefiActivity(activity);
      if (!parsed) return;

      const { type, tokenIn, tokenOut, amountIn, amountOut } = parsed;
      const SOL_ADDRESS = 'So11111111111111111111111111111111111111112';

      // Track token trades
      if (type === 'buy' && tokenOut.address && tokenOut.address !== SOL_ADDRESS) {
        const key = tokenOut.address;
        if (!tokenTrades[key]) {
          tokenTrades[key] = {
            symbol: tokenOut.symbol || 'Unknown',
            name: tokenOut.name || 'Unknown Token',
            icon: tokenOut.icon || '',
            buys: [],
            sells: [],
            totalBought: 0,
            totalSold: 0,
            totalSpent: 0,
            totalReceived: 0,
          };
        }
        tokenTrades[key].buys.push({ amount: amountOut, sol: amountIn, time: activity.block_time });
        tokenTrades[key].totalBought += amountOut;
        tokenTrades[key].totalSpent += amountIn;
      } else if (type === 'sell' && tokenIn.address && tokenIn.address !== SOL_ADDRESS) {
        const key = tokenIn.address;
        if (!tokenTrades[key]) {
          tokenTrades[key] = {
            symbol: tokenIn.symbol || 'Unknown',
            name: tokenIn.name || 'Unknown Token',
            icon: tokenIn.icon || '',
            buys: [],
            sells: [],
            totalBought: 0,
            totalSold: 0,
            totalSpent: 0,
            totalReceived: 0,
          };
        }
        tokenTrades[key].sells.push({ amount: amountIn, sol: amountOut, time: activity.block_time });
        tokenTrades[key].totalSold += amountIn;
        tokenTrades[key].totalReceived += amountOut;
      }
    });

    // Calculate P&L for each token
    return Object.entries(tokenTrades).map(([address, data]) => {
      const pnlSol = data.totalReceived - data.totalSpent;
      const roi = data.totalSpent > 0 ? ((data.totalReceived - data.totalSpent) / data.totalSpent) * 100 : 0;
      const holding = data.totalBought - data.totalSold;
      const lastTrade = Math.max(
        ...data.buys.map(b => b.time || 0),
        ...data.sells.map(s => s.time || 0)
      );

      return {
        address,
        ...data,
        pnlSol,
        roi,
        holding,
        lastTrade,
      };
    }).sort((a, b) => b.lastTrade - a.lastTrade);
  };

  return (
    <section id="tracker" className="tracker-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="tracker-header"
        >
          <h2 className="section-title">Solana Chain Info</h2>
          <p className="section-subtitle">
            Enter a Solana contract address to fetch blockchain information
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          className="tracker-search"
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Enter Solana contract address..."
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="search-input"
            />
            {searchAddress && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => setSearchAddress('')}
              >
                ×
              </button>
            )}
          </div>
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? (
              <RefreshCw size={20} className="spinning" />
            ) : (
              <>
                <Search size={18} />
                Get Chain Info
              </>
            )}
          </button>
        </motion.form>

        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && error && (
            <motion.div
              className="error-toast"
              initial={{ opacity: 0, y: -20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -20, x: '-50%' }}
              transition={{ duration: 0.3 }}
            >
              <div className="toast-content">
                <span className="toast-icon">⚠️</span>
                <span className="toast-message">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chain Info Display */}
        {chainInfo && chainInfo.data && (
          <motion.div
            className="wallet-data"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <Activity size={20} />
                  <span>Block Height</span>
                </div>
                <div className="stat-value">{chainInfo.data.blockHeight?.toLocaleString()}</div>
                <div className="stat-label">Current Block</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <Timer size={20} />
                  <span>Current Epoch</span>
                </div>
                <div className="stat-value">{chainInfo.data.currentEpoch}</div>
                <div className="stat-label">Epoch Number</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <Clock size={20} />
                  <span>Absolute Slot</span>
                </div>
                <div className="stat-value">{chainInfo.data.absoluteSlot?.toLocaleString()}</div>
                <div className="stat-label">Current Slot</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <BarChart3 size={20} />
                  <span>Total Transactions</span>
                </div>
                <div className="stat-value">{formatNumber(chainInfo.data.transactionCount)}</div>
                <div className="stat-label">All Time</div>
              </div>
            </div>

            {chainInfo.success && (
              <div className="chain-status">
                <div className="status-indicator success"></div>
                <span>Network is online and healthy</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Empty State - No search yet */}
        {!chainInfo && !loading && (
          <motion.div
            className="tracker-placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Activity size={48} />
            <p>Enter a Solana contract address to view blockchain information</p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            className="loading-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <RefreshCw size={32} className="spinning" />
            <p>Fetching chain information...</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WalletTracker;
