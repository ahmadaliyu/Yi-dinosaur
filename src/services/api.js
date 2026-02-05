// API Service for fetching real data from multiple sources
// Note: Some APIs require keys - store them in .env file

const API_CONFIG = {
  // Add your API keys in .env file
  COINGECKO_BASE: 'https://api.coingecko.com/api/v3',
  DEXSCREENER_BASE: 'https://api.dexscreener.com',
  SOLANA_RPC: import.meta.env.VITE_SOLANA_RPC || 'https://api.mainnet-beta.solana.com',
  
  // Your $Yi token addresses (update these with real addresses)
  YI_TOKEN_MINT: import.meta.env.VITE_YI_TOKEN_MINT || 'YOUR_YI_TOKEN_MINT_ADDRESS',
  YI_PAIR_ADDRESS: import.meta.env.VITE_YI_PAIR_ADDRESS || 'YOUR_DEX_PAIR_ADDRESS',
  
  // Social API keys (optional - add to .env)
  TWITTER_BEARER_TOKEN: import.meta.env.VITE_TWITTER_BEARER_TOKEN,
  TELEGRAM_BOT_TOKEN: import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID,
  SOLSCAN_PUBLIC_BASE: 'https://public-api.solscan.io',
  SOLSCAN_PRO_BASE: import.meta.env.VITE_SOLSCAN_PRO_BASE || 'https://pro-api.solscan.io',
  SOLSCAN_KEY: import.meta.env.VITE_SOLSCAN_API_KEY,
};

// Helper to call Solscan public API
const solscanPublicFetch = async (path, params = {}) => {
  const url = new URL(`${API_CONFIG.SOLSCAN_PUBLIC_BASE}/${path}`);
  Object.keys(params).forEach(k => url.searchParams.append(k, params[k]));
  try {
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Solscan public API error');
    return await res.json();
  } catch (err) {
    console.error('Solscan public fetch error:', err);
    return null;
  }
};

// Public endpoints
export const fetchPublicChainInfo = async () => {
  return await solscanPublicFetch('chaininfo');
};

export const fetchPublicAccountDetail = async (address) => {
  if (!address) return null;
  // public API mirrors some pro endpoints but may differ; try v2 account detail
  return await solscanPublicFetch('account/detail', { address });
};

// ============================================
// COINGECKO - Token Price & Market Data (FREE)
// ============================================
export const fetchCoinGeckoData = async (coinId = 'solana') => {
  try {
    const response = await fetch(
      `${API_CONFIG.COINGECKO_BASE}/coins/${coinId}?localization=false&tickers=false&community_data=true&developer_data=false`
    );
    
    if (!response.ok) throw new Error('CoinGecko API error');
    
    const data = await response.json();
    
    return {
      price: data.market_data?.current_price?.usd || 0,
      priceChange24h: data.market_data?.price_change_percentage_24h || 0,
      marketCap: data.market_data?.market_cap?.usd || 0,
      volume24h: data.market_data?.total_volume?.usd || 0,
      totalSupply: data.market_data?.total_supply || 0,
      circulatingSupply: data.market_data?.circulating_supply || 0,
      // Social data from CoinGecko
      twitterFollowers: data.community_data?.twitter_followers || 0,
      telegramUsers: data.community_data?.telegram_channel_user_count || 0,
      redditSubscribers: data.community_data?.reddit_subscribers || 0,
    };
  } catch (error) {
    console.error('CoinGecko fetch error:', error);
    return null;
  }
};

// ============================================
// DEXSCREENER - DEX Trading Data (FREE)
// ============================================

// Get latest token profiles (trending tokens)
export const fetchLatestTokenProfiles = async () => {
  try {
    const response = await fetch(
      `${API_CONFIG.DEXSCREENER_BASE}/token-profiles/latest/v1`
    );
    
    if (!response.ok) throw new Error('DexScreener API error');
    
    const data = await response.json();
    
    // Returns array of token profiles with icon, header, description, links
    return data;
  } catch (error) {
    console.error('DexScreener token profiles error:', error);
    return null;
  }
};

// Get token data by address (price, volume, liquidity)
export const fetchDexScreenerData = async (tokenAddress) => {
  try {
    const address = tokenAddress || API_CONFIG.YI_TOKEN_MINT;
    
    if (address === 'YOUR_YI_TOKEN_MINT_ADDRESS') {
      console.warn('Please set your $Yi token mint address in .env');
      return null;
    }
    
    // Search by token address on Solana
    const response = await fetch(
      `${API_CONFIG.DEXSCREENER_BASE}/latest/dex/tokens/${address}`
    );
    
    if (!response.ok) throw new Error('DexScreener API error');
    
    const data = await response.json();
    const pair = data.pairs?.[0];
    
    if (!pair) return null;
    
    return {
      price: parseFloat(pair.priceUsd) || 0,
      priceNative: parseFloat(pair.priceNative) || 0,
      priceChange24h: pair.priceChange?.h24 || 0,
      priceChange6h: pair.priceChange?.h6 || 0,
      priceChange1h: pair.priceChange?.h1 || 0,
      priceChange5m: pair.priceChange?.m5 || 0,
      volume24h: pair.volume?.h24 || 0,
      volume6h: pair.volume?.h6 || 0,
      volume1h: pair.volume?.h1 || 0,
      liquidity: pair.liquidity?.usd || 0,
      liquidityBase: pair.liquidity?.base || 0,
      liquidityQuote: pair.liquidity?.quote || 0,
      txns24h: (pair.txns?.h24?.buys || 0) + (pair.txns?.h24?.sells || 0),
      buys24h: pair.txns?.h24?.buys || 0,
      sells24h: pair.txns?.h24?.sells || 0,
      txns1h: (pair.txns?.h1?.buys || 0) + (pair.txns?.h1?.sells || 0),
      fdv: pair.fdv || 0,
      marketCap: pair.marketCap || pair.fdv || 0,
      pairAddress: pair.pairAddress,
      pairCreatedAt: pair.pairCreatedAt,
      dexId: pair.dexId,
      chainId: pair.chainId,
      baseToken: pair.baseToken,
      quoteToken: pair.quoteToken,
      info: pair.info, // Contains imageUrl, websites, socials
    };
  } catch (error) {
    console.error('DexScreener fetch error:', error);
    return null;
  }
};

// Get pair data by pair address
export const fetchDexScreenerPair = async (pairAddress) => {
  try {
    const response = await fetch(
      `${API_CONFIG.DEXSCREENER_BASE}/latest/dex/pairs/solana/${pairAddress}`
    );
    
    if (!response.ok) throw new Error('DexScreener API error');
    
    const data = await response.json();
    return data.pair || null;
  } catch (error) {
    console.error('DexScreener pair fetch error:', error);
    return null;
  }
};

// Search tokens by query
export const searchDexScreener = async (query) => {
  try {
    const response = await fetch(
      `${API_CONFIG.DEXSCREENER_BASE}/latest/dex/search?q=${encodeURIComponent(query)}`
    );
    
    if (!response.ok) throw new Error('DexScreener API error');
    
    const data = await response.json();
    return data.pairs || [];
  } catch (error) {
    console.error('DexScreener search error:', error);
    return [];
  }
};

// ============================================
// SOLANA RPC - On-Chain Data
// ============================================
export const fetchSolanaTokenData = async () => {
  try {
    const mintAddress = API_CONFIG.YI_TOKEN_MINT;
    
    if (mintAddress === 'YOUR_YI_TOKEN_MINT_ADDRESS') {
      console.warn('Please set your $Yi token mint address in .env');
      return null;
    }
    
    // Get token supply
    const supplyResponse = await fetch(API_CONFIG.SOLANA_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getTokenSupply',
        params: [mintAddress],
      }),
    });
    
    const supplyData = await supplyResponse.json();
    
    // Get largest token holders
    const holdersResponse = await fetch(API_CONFIG.SOLANA_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 2,
        method: 'getTokenLargestAccounts',
        params: [mintAddress],
      }),
    });
    
    const holdersData = await holdersResponse.json();
    
    return {
      totalSupply: supplyData.result?.value?.uiAmount || 0,
      decimals: supplyData.result?.value?.decimals || 9,
      topHolders: holdersData.result?.value || [],
      holderCount: holdersData.result?.value?.length || 0,
    };
  } catch (error) {
    console.error('Solana RPC fetch error:', error);
    return null;
  }
};

// ============================================
// TWITTER/X API - Social Data (Requires API Key)
// ============================================
export const fetchTwitterData = async (username = 'YiDinosaurToken') => {
  try {
    const bearerToken = API_CONFIG.TWITTER_BEARER_TOKEN;
    
    if (!bearerToken) {
      console.warn('Twitter API key not configured');
      return null;
    }
    
    // Note: This needs to be proxied through a backend for security
    // Direct browser calls will expose your API key
    const response = await fetch(`/api/twitter/user/${username}`, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
      },
    });
    
    if (!response.ok) throw new Error('Twitter API error');
    
    const data = await response.json();
    
    return {
      followers: data.data?.public_metrics?.followers_count || 0,
      following: data.data?.public_metrics?.following_count || 0,
      tweets: data.data?.public_metrics?.tweet_count || 0,
      listed: data.data?.public_metrics?.listed_count || 0,
    };
  } catch (error) {
    console.error('Twitter fetch error:', error);
    return null;
  }
};

// ============================================
// TELEGRAM API - Group Data (Requires Bot Token)
// ============================================
export const fetchTelegramData = async () => {
  try {
    const botToken = API_CONFIG.TELEGRAM_BOT_TOKEN;
    const chatId = API_CONFIG.TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) {
      console.warn('Telegram credentials not configured');
      return null;
    }
    
    // Note: This should also be proxied through a backend
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/getChatMemberCount?chat_id=${chatId}`
    );
    
    if (!response.ok) throw new Error('Telegram API error');
    
    const data = await response.json();
    
    return {
      memberCount: data.result || 0,
    };
  } catch (error) {
    console.error('Telegram fetch error:', error);
    return null;
  }
};

// ============================================
// COMBINED DATA FETCHER
// ============================================
export const fetchAllData = async () => {
  const [coinGecko, dexScreener, solana] = await Promise.all([
    fetchCoinGeckoData(),
    fetchDexScreenerData(),
    fetchSolanaTokenData(),
  ]);
  
  return {
    coinGecko,
    dexScreener,
    solana,
    timestamp: Date.now(),
  };
};

// ============================================
// WEBSOCKET FOR REAL-TIME UPDATES (Optional)
// ============================================
export const createDexScreenerWebSocket = (pairAddress, onUpdate) => {
  // DexScreener doesn't have public WebSocket, but you can poll
  // For real-time, consider using Birdeye or Helius WebSocket
  
  const interval = setInterval(async () => {
    const data = await fetchDexScreenerData(pairAddress);
    if (data) onUpdate(data);
  }, 10000); // Poll every 10 seconds
  
  return () => clearInterval(interval);
};

export default {
  fetchCoinGeckoData,
  fetchLatestTokenProfiles,
  fetchDexScreenerData,
  fetchDexScreenerPair,
  searchDexScreener,
  fetchSolanaTokenData,
  fetchTwitterData,
  fetchTelegramData,
  fetchAllData,
  createDexScreenerWebSocket,
};
