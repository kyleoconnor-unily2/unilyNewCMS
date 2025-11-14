import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ForexRate {
  pair: string;
  rate: number;
  change: number;
  changePercent: number;
  // Future: Add candlestick data properties
  // historicalData?: { timestamp: Date; open: number; high: number; low: number; close: number; }[];
}

@Component({
  selector: 'app-forex-widget',
  templateUrl: './forex-widget.component.html',
  styleUrls: ['./forex-widget.component.scss'],
  standalone: false
})
export class ForexWidgetComponent implements OnInit, OnDestroy {
  forexRates: ForexRate[] = [];
  forexUpdateTime = new Date();
  private updateInterval: any;
  displayLimit = 14; // Default: show all
  displayOptions = [5, 10, 14];
  
  // Currency pairs to track (14 popular pairs)
  // Organized by base currency for easier comparison
  private currencyPairs = [
    'EUR/USD', 'EUR/GBP', 'EUR/JPY', 'EUR/CHF',
    'GBP/USD', 'GBP/JPY', 'GBP/CHF',
    'USD/JPY', 'USD/CAD', 'USD/CHF', 'USD/MXN',
    'AUD/USD', 'AUD/JPY',
    'CHF/JPY'
  ];
  
  // Using Frankfurter API (free, no API key required)
  // Note: Bitcoin not available on Frankfurter API
  private readonly API_BASE = 'https://api.frankfurter.app';

  constructor(private http: HttpClient) {}

  get visibleRates(): ForexRate[] {
    return this.forexRates.slice(0, this.displayLimit);
  }

  onDisplayLimitChange(event: any): void {
    this.displayLimit = parseInt(event.target.value, 10);
  }

  ngOnInit(): void {
    // Initial fetch
    this.fetchForexRates();
    
    // Update forex rates every 60 seconds (Frankfurter updates daily, but we'll check periodically)
    this.updateInterval = setInterval(() => {
      this.fetchForexRates();
    }, 60000);
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  getFlags(pair: string): string {
    const flagMap: { [key: string]: string } = {
      'EUR/USD': '<img src="https://flagcdn.com/16x12/eu.png" alt="EU"> <img src="https://flagcdn.com/16x12/us.png" alt="US">',
      'GBP/USD': '<img src="https://flagcdn.com/16x12/gb.png" alt="GB"> <img src="https://flagcdn.com/16x12/us.png" alt="US">',
      'USD/JPY': '<img src="https://flagcdn.com/16x12/us.png" alt="US"> <img src="https://flagcdn.com/16x12/jp.png" alt="JP">',
      'USD/CAD': '<img src="https://flagcdn.com/16x12/us.png" alt="US"> <img src="https://flagcdn.com/16x12/ca.png" alt="CA">'
    };
    return flagMap[pair] || '';
  }

  getFirstFlag(pair: string): string {
    const currencyFlags: { [key: string]: string } = {
      'EUR': '<img src="https://flagcdn.com/w40/eu.png" alt="EU" width="26">',
      'USD': '<img src="https://flagcdn.com/w40/us.png" alt="US" width="26">',
      'GBP': '<img src="https://flagcdn.com/w40/gb.png" alt="GB" width="26">',
      'JPY': '<img src="https://flagcdn.com/w40/jp.png" alt="JP" width="26">',
      'CAD': '<img src="https://flagcdn.com/w40/ca.png" alt="CA" width="26">',
      'CHF': '<img src="https://flagcdn.com/w40/ch.png" alt="CH" width="26">',
      'AUD': '<img src="https://flagcdn.com/w40/au.png" alt="AU" width="26">',
      'MXN': '<img src="https://flagcdn.com/w40/mx.png" alt="MX" width="26">'
    };
    const firstCurrency = pair.split('/')[0];
    return currencyFlags[firstCurrency] || '';
  }

  getSecondFlag(pair: string): string {
    const currencyFlags: { [key: string]: string } = {
      'EUR': '<img src="https://flagcdn.com/w40/eu.png" alt="EU" width="26">',
      'USD': '<img src="https://flagcdn.com/w40/us.png" alt="US" width="26">',
      'GBP': '<img src="https://flagcdn.com/w40/gb.png" alt="GB" width="26">',
      'JPY': '<img src="https://flagcdn.com/w40/jp.png" alt="JP" width="26">',
      'CAD': '<img src="https://flagcdn.com/w40/ca.png" alt="CA" width="26">',
      'CHF': '<img src="https://flagcdn.com/w40/ch.png" alt="CH" width="26">',
      'AUD': '<img src="https://flagcdn.com/w40/au.png" alt="AU" width="26">',
      'MXN': '<img src="https://flagcdn.com/w40/mx.png" alt="MX" width="26">'
    };
    const secondCurrency = pair.split('/')[1];
    return currencyFlags[secondCurrency] || '';
  }

  private fetchForexRates(): void {
    // Fetch current rates for all currencies
    const currentRequest = this.http.get<any>(`${this.API_BASE}/latest?from=USD&to=EUR,GBP,JPY,CAD,CHF,AUD,MXN`);
    
    // Fetch rates from 7 days ago for better comparison (since Frankfurter updates daily)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];
    const historicalRequest = this.http.get<any>(`${this.API_BASE}/${weekAgoStr}?from=USD&to=EUR,GBP,JPY,CAD,CHF,AUD,MXN`);

    // Combine both requests
    currentRequest.subscribe({
      next: (currentData) => {
        console.log('Current forex data:', currentData);
        historicalRequest.subscribe({
          next: (historicalData) => {
            console.log('Historical forex data:', historicalData);
            this.updateRatesFromApi(currentData, historicalData.rates);
            this.forexUpdateTime = new Date();
          },
          error: () => {
            // If historical fails, just use current data
            console.warn('Historical data fetch failed, using current data only');
            this.updateRatesFromApi(currentData, currentData.rates);
            this.forexUpdateTime = new Date();
          }
        });
      },
      error: (error) => {
        console.error('Error fetching forex rates:', error);
        this.useFallbackData();
      }
    });
  }

  private updateRatesFromApi(data: any, previousRates?: any): void {
    const rates = data.rates;
    const prevRates = previousRates || rates;
    const newRates: ForexRate[] = [];

    // EUR pairs
    // EUR/USD
    if (rates.EUR) {
      const eurUsd = 1 / rates.EUR;
      const prevEurUsd = prevRates.EUR ? 1 / prevRates.EUR : eurUsd;
      const change = eurUsd - prevEurUsd;
      const changePercent = ((change / prevEurUsd) * 100);
      
      newRates.push({
        pair: 'EUR/USD',
        rate: parseFloat(eurUsd.toFixed(4)),
        change: parseFloat(change.toFixed(4)),
        changePercent: parseFloat(changePercent.toFixed(2))
      });
    }

    // EUR/GBP
    if (rates.EUR && rates.GBP) {
      const eurGbp = rates.GBP / rates.EUR;
      const prevEurGbp = (prevRates.EUR && prevRates.GBP) ? prevRates.GBP / prevRates.EUR : eurGbp;
      const change = eurGbp - prevEurGbp;
      const changePercent = ((change / prevEurGbp) * 100);
      
      newRates.push({
        pair: 'EUR/GBP',
        rate: parseFloat(eurGbp.toFixed(4)),
        change: parseFloat(change.toFixed(4)),
        changePercent: parseFloat(changePercent.toFixed(2))
      });
    }

    // EUR/JPY
    if (rates.EUR && rates.JPY) {
      const eurJpy = rates.JPY / rates.EUR;
      const prevEurJpy = (prevRates.EUR && prevRates.JPY) ? prevRates.JPY / prevRates.EUR : eurJpy;
      const change = eurJpy - prevEurJpy;
      const changePercent = ((change / prevEurJpy) * 100);
      
      newRates.push({
        pair: 'EUR/JPY',
        rate: parseFloat(eurJpy.toFixed(2)),
        change: parseFloat(change.toFixed(4)),
        changePercent: parseFloat(changePercent.toFixed(2))
      });
    }

    // EUR/CHF
    if (rates.EUR && rates.CHF) {
      const eurChf = rates.CHF / rates.EUR;
      const prevEurChf = (prevRates.EUR && prevRates.CHF) ? prevRates.CHF / prevRates.EUR : eurChf;
      const change = eurChf - prevEurChf;
      const changePercent = ((change / prevEurChf) * 100);
      
      newRates.push({
        pair: 'EUR/CHF',
        rate: parseFloat(eurChf.toFixed(4)),
        change: parseFloat(change.toFixed(4)),
        changePercent: parseFloat(changePercent.toFixed(2))
      });
    }

    // GBP pairs
    // GBP/USD
    if (rates.GBP) {
      const gbpUsd = 1 / rates.GBP;
      const prevGbpUsd = prevRates.GBP ? 1 / prevRates.GBP : gbpUsd;
      const change = gbpUsd - prevGbpUsd;
      const changePercent = ((change / prevGbpUsd) * 100);
      
      newRates.push({
        pair: 'GBP/USD',
        rate: parseFloat(gbpUsd.toFixed(4)),
        change: parseFloat(change.toFixed(4)),
        changePercent: parseFloat(changePercent.toFixed(2))
      });
    }

    // GBP/JPY
    if (rates.GBP && rates.JPY) {
      const gbpJpy = rates.JPY / rates.GBP;
      const prevGbpJpy = (prevRates.GBP && prevRates.JPY) ? prevRates.JPY / prevRates.GBP : gbpJpy;
      const change = gbpJpy - prevGbpJpy;
      const changePercent = ((change / prevGbpJpy) * 100);
      
      newRates.push({
        pair: 'GBP/JPY',
        rate: parseFloat(gbpJpy.toFixed(2)),
        change: parseFloat(change.toFixed(4)),
        changePercent: parseFloat(changePercent.toFixed(2))
      });
    }

    // GBP/CHF
    if (rates.GBP && rates.CHF) {
      const gbpChf = rates.CHF / rates.GBP;
      const prevGbpChf = (prevRates.GBP && prevRates.CHF) ? prevRates.CHF / prevRates.GBP : gbpChf;
      const change = gbpChf - prevGbpChf;
      const changePercent = ((change / prevGbpChf) * 100);
      
      newRates.push({
        pair: 'GBP/CHF',
        rate: parseFloat(gbpChf.toFixed(4)),
        change: parseFloat(change.toFixed(4)),
        changePercent: parseFloat(changePercent.toFixed(2))
      });
    }

    // USD pairs
    // USD/JPY
    if (rates.JPY) {
      const usdJpy = rates.JPY;
      const prevUsdJpy = prevRates.JPY || usdJpy;
      const change = usdJpy - prevUsdJpy;
      const changePercent = ((change / prevUsdJpy) * 100);
      
      newRates.push({
        pair: 'USD/JPY',
        rate: parseFloat(usdJpy.toFixed(2)),
        change: parseFloat(change.toFixed(4)),
        changePercent: parseFloat(changePercent.toFixed(2))
      });
    }

    // USD/CAD
    if (rates.CAD) {
      const usdCad = rates.CAD;
      const prevUsdCad = prevRates.CAD || usdCad;
      const change = usdCad - prevUsdCad;
      const changePercent = ((change / prevUsdCad) * 100);
      
      newRates.push({
        pair: 'USD/CAD',
        rate: parseFloat(usdCad.toFixed(4)),
        change: parseFloat(change.toFixed(4)),
        changePercent: parseFloat(changePercent.toFixed(2))
      });
    }

    // USD/CHF (Swiss Franc)
    if (rates.CHF) {
      const usdChf = rates.CHF;
      const prevUsdChf = prevRates.CHF || usdChf;
      const change = usdChf - prevUsdChf;
      const changePercent = ((change / prevUsdChf) * 100);
      
      newRates.push({
        pair: 'USD/CHF',
        rate: parseFloat(usdChf.toFixed(4)),
        change: parseFloat(change.toFixed(4)),
        changePercent: parseFloat(changePercent.toFixed(2))
      });
    }

    // USD/MXN (Mexican Peso)
    if (rates.MXN) {
      const usdMxn = rates.MXN;
      const prevUsdMxn = prevRates.MXN || usdMxn;
      const change = usdMxn - prevUsdMxn;
      const changePercent = ((change / prevUsdMxn) * 100);
      
      newRates.push({
        pair: 'USD/MXN',
        rate: parseFloat(usdMxn.toFixed(2)),
        change: parseFloat(change.toFixed(4)),
        changePercent: parseFloat(changePercent.toFixed(2))
      });
    }

    // AUD pairs
    // AUD/USD (Australian Dollar)
    if (rates.AUD) {
      const audUsd = 1 / rates.AUD;
      const prevAudUsd = prevRates.AUD ? 1 / prevRates.AUD : audUsd;
      const change = audUsd - prevAudUsd;
      const changePercent = ((change / prevAudUsd) * 100);
      
      newRates.push({
        pair: 'AUD/USD',
        rate: parseFloat(audUsd.toFixed(4)),
        change: parseFloat(change.toFixed(4)),
        changePercent: parseFloat(changePercent.toFixed(2))
      });
    }

    // AUD/JPY
    if (rates.AUD && rates.JPY) {
      const audJpy = rates.JPY / rates.AUD;
      const prevAudJpy = (prevRates.AUD && prevRates.JPY) ? prevRates.JPY / prevRates.AUD : audJpy;
      const change = audJpy - prevAudJpy;
      const changePercent = ((change / prevAudJpy) * 100);
      
      newRates.push({
        pair: 'AUD/JPY',
        rate: parseFloat(audJpy.toFixed(2)),
        change: parseFloat(change.toFixed(4)),
        changePercent: parseFloat(changePercent.toFixed(2))
      });
    }

    // CHF pairs
    // CHF/JPY
    if (rates.CHF && rates.JPY) {
      const chfJpy = rates.JPY / rates.CHF;
      const prevChfJpy = (prevRates.CHF && prevRates.JPY) ? prevRates.JPY / prevRates.CHF : chfJpy;
      const change = chfJpy - prevChfJpy;
      const changePercent = ((change / prevChfJpy) * 100);
      
      newRates.push({
        pair: 'CHF/JPY',
        rate: parseFloat(chfJpy.toFixed(2)),
        change: parseFloat(change.toFixed(4)),
        changePercent: parseFloat(changePercent.toFixed(2))
      });
    }

    this.forexRates = newRates;
  }

  private useFallbackData(): void {
    // Fallback data in case API fails
    this.forexRates = [
      { pair: 'EUR/USD', rate: 1.0850, change: 0.0025, changePercent: 0.23 },
      { pair: 'EUR/GBP', rate: 0.8590, change: 0.0005, changePercent: 0.06 },
      { pair: 'EUR/JPY', rate: 162.50, change: 1.20, changePercent: 0.74 },
      { pair: 'EUR/CHF', rate: 0.9600, change: 0.0008, changePercent: 0.08 },
      { pair: 'GBP/USD', rate: 1.2630, change: -0.0045, changePercent: -0.35 },
      { pair: 'GBP/JPY', rate: 189.20, change: -0.80, changePercent: -0.42 },
      { pair: 'GBP/CHF', rate: 1.1180, change: -0.0012, changePercent: -0.11 },
      { pair: 'USD/JPY', rate: 149.85, change: 0.75, changePercent: 0.50 },
      { pair: 'USD/CAD', rate: 1.3720, change: -0.0020, changePercent: -0.15 },
      { pair: 'USD/CHF', rate: 0.8850, change: 0.0010, changePercent: 0.11 },
      { pair: 'USD/MXN', rate: 17.25, change: 0.10, changePercent: 0.58 },
      { pair: 'AUD/USD', rate: 0.6520, change: -0.0015, changePercent: -0.23 },
      { pair: 'AUD/JPY', rate: 97.65, change: 0.45, changePercent: 0.46 },
      { pair: 'CHF/JPY', rate: 169.30, change: 0.90, changePercent: 0.53 }
    ];
    this.forexUpdateTime = new Date();
  }

  togglePair(rate: ForexRate): void {
    // Reverse the currency pair
    const currencies = rate.pair.split('/');
    rate.pair = `${currencies[1]}/${currencies[0]}`;
    
    // Inverse the rate (1 / rate)
    const newRate = 1 / rate.rate;
    rate.rate = parseFloat(newRate.toFixed(4));
    
    // Inverse the change
    const newChange = -rate.change / (rate.rate * rate.rate);
    rate.change = parseFloat(newChange.toFixed(4));
    
    // Change percent stays the same sign but we need to recalculate
    rate.changePercent = parseFloat((rate.changePercent * -1).toFixed(2));
  }
}
