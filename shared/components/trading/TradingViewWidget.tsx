"use client"

import { useEffect, useRef, memo } from "react"

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current) {
      // Clear any existing content
      container.current.innerHTML = ""

      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
      script.type = "text/javascript"
      script.async = true
      script.innerHTML = `
        {
          "allow_symbol_change": true,
          "calendar": false,
          "details": false,
          "hide_side_toolbar": true,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "D",
          "locale": "en",
          "save_image": true,
          "style": "1",
          "symbol": "NASDAQ:TSLA",
          "theme": "dark",
          "timezone": "Etc/UTC",
          "backgroundColor": "#ffffff",
          "gridColor": "rgba(46, 46, 46, 0.06)",
          "watchlist": [],
          "withdateranges": false,
          "compareSymbols": [],
          "studies": [],
          "autosize": true
        }`

      // Create the widget container structure
      const widgetContainer = document.createElement("div")
      widgetContainer.className = "tradingview-widget-container__widget"
      widgetContainer.style.height = "calc(100% - 32px)"
      widgetContainer.style.width = "100%"

      const copyrightDiv = document.createElement("div")
      copyrightDiv.className = "tradingview-widget-copyright"
      copyrightDiv.innerHTML =
        '<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>'

      container.current.appendChild(widgetContainer)
      container.current.appendChild(copyrightDiv)
      container.current.appendChild(script)
    }
  }, [])

  return <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}></div>
}

export default memo(TradingViewWidget)
