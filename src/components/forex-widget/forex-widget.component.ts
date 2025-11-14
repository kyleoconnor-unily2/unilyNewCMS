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
  
  // Currency pairs to track
  private currencyPairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CAD'];
  
  // Using Frankfurter API (free, no API key required)
  private readonly API_BASE = 'https://api.frankfurter.app';

  constructor(private http: HttpClient) {}

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
    const flagMap: { [key: string]: string } = {
      'EUR/USD': '<img src="https://flagcdn.com/32x24/eu.png" alt="EU">',
      'USD/EUR': '<img src="https://flagcdn.com/32x24/us.png" alt="US">',
      'GBP/USD': '<img src="https://flagcdn.com/32x24/gb.png" alt="GB">',
      'USD/GBP': '<img src="https://flagcdn.com/32x24/us.png" alt="US">',
      'USD/JPY': '<img src="https://flagcdn.com/32x24/us.png" alt="US">',
      'JPY/USD': '<img src="https://flagcdn.com/32x24/jp.png" alt="JP">',
      'USD/CAD': '<img src="https://flagcdn.com/32x24/us.png" alt="US">',
      'CAD/USD': '<img src="https://flagcdn.com/32x24/ca.png" alt="CA">'
    };
    return flagMap[pair] || '';
  }

  getSecondFlag(pair: string): string {
    const flagMap: { [key: string]: string } = {
      'EUR/USD': '<img src="https://flagcdn.com/32x24/us.png" alt="US">',
      'USD/EUR': '<img src="https://flagcdn.com/32x24/eu.png" alt="EU">',
      'GBP/USD': '<img src="https://flagcdn.com/32x24/us.png" alt="US">',
      'USD/GBP': '<img src="https://flagcdn.com/32x24/gb.png" alt="GB">',
      'USD/JPY': '<img src="https://flagcdn.com/32x24/jp.png" alt="JP">',
      'JPY/USD': '<img src="https://flagcdn.com/32x24/us.png" alt="US">',
      'USD/CAD': '<img src="https://flagcdn.com/32x24/ca.png" alt="CA">',
      'CAD/USD': '<img src="https://flagcdn.com/32x24/us.png" alt="US">'
    };
    return flagMap[pair] || '';
  }

  private fetchForexRates(): void {
    // Fetch current rates
    const currentRequest = this.http.get<any>(`${this.API_BASE}/latest?from=USD&to=EUR,GBP,JPY,CAD`);
    
    // Fetch yesterday's rates for comparison
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const historicalRequest = this.http.get<any>(`${this.API_BASE}/${yesterdayStr}?from=USD&to=EUR,GBP,JPY,CAD`);

    // Combine both requests
    currentRequest.subscribe({
      next: (currentData) => {
        historicalRequest.subscribe({
          next: (historicalData) => {
            this.updateRatesFromApi(currentData, historicalData.rates);
            this.forexUpdateTime = new Date();
          },
          error: () => {
            // If historical fails, just use current data
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

    this.forexRates = newRates;
  }

  private useFallbackData(): void {
    // Fallback data in case API fails
    this.forexRates = [
      { pair: 'EUR/USD', rate: 1.0850, change: 0.0025, changePercent: 0.23 },
      { pair: 'GBP/USD', rate: 1.2630, change: -0.0045, changePercent: -0.35 },
      { pair: 'USD/JPY', rate: 149.85, change: 0.75, changePercent: 0.50 },
      { pair: 'USD/CAD', rate: 1.3720, change: -0.0020, changePercent: -0.15 }
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
