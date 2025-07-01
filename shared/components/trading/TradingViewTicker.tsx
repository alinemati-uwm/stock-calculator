"use client"

import { useEffect, useRef, memo } from "react"

function TradingViewTicker() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current) {
      // Clear any existing content
      container.current.innerHTML = ""

      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
      script.type = "text/javascript"
      script.async = true
      script.innerHTML = `
        {
          "symbols": [
            {
              "proName": "FOREXCOM:SPXUSD",
              "title": "S&P 500 Index"
            },
            {
              "proName": "FOREXCOM:NSXUSD",
              "title": "US 100 Cash CFD"
            },
            {
              "proName": "FX_IDC:EURUSD",
              "title": "EUR to USD"
            },
            {
              "proName": "BITSTAMP:BTCUSD",
              "title": "Bitcoin"
            },
            {
              "proName": "BITSTAMP:ETHUSD",
              "title": "Ethereum"
            }
          ],
          "colorTheme": "dark",
          "locale": "en",
          "largeChartUrl": "",
          "isTransparent": false,
          "showSymbolLogo": true,
          "displayMode": "adaptive"
        }`

      // Create the widget container structure
      const widgetContainer = document.createElement("div")
      widgetContainer.className = "tradingview-widget-container__widget"

      const copyrightDiv = document.createElement("div")
      copyrightDiv.className = "tradingview-widget-copyright"
      copyrightDiv.innerHTML =
        '<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>'

      container.current.appendChild(widgetContainer)
      container.current.appendChild(copyrightDiv)
      container.current.appendChild(script)
    }
  }, [])

  return <div className="tradingview-widget-container w-full" ref={container} style={{ height: "60px" }}></div>
}

export default memo(TradingViewTicker)
