import { useState } from 'react';
import './App.css';

export default function App() {
  const [currency, setCurrency] = useState<'DKK' | 'EUR'>('EUR');
  
  const [purchasePriceStr, setPurchasePriceStr] = useState<string>('');
  const [exchangeRateStr, setExchangeRateStr] = useState<string>('7,45');
  const [totalShippingStr, setTotalShippingStr] = useState<string>(''); 
  const [totalItemsStr, setTotalItemsStr] = useState<string>(''); 
  const [markupPercentStr, setMarkupPercentStr] = useState<string>('50'); 
  const [vatRate, setVatRate] = useState<number>(25);
  const [packagingStr, setPackagingStr] = useState<string>(''); 
  const [paymentFeeStr, setPaymentFeeStr] = useState<string>('1,5'); 

  const parseNum = (val: string) => {
    const num = parseFloat(val.replace(',', '.'));
    return isNaN(num) ? 0 : num;
  };

  const purchasePrice = parseNum(purchasePriceStr);
  const exchangeRate = parseNum(exchangeRateStr);
  const totalShipping = parseNum(totalShippingStr);
  const totalItems = parseNum(totalItemsStr);
  const markupPercent = parseNum(markupPercentStr);
  const packagingCost = parseNum(packagingStr);
  const paymentFeePercent = parseNum(paymentFeeStr);

  const shippingPerItem = totalItems > 0 ? totalShipping / totalItems : 0;
  const effectivePurchasePrice = purchasePrice + shippingPerItem;

  const purchasePriceInDKK = currency === 'EUR' ? effectivePurchasePrice * exchangeRate : effectivePurchasePrice;
  const netSellingPrice = purchasePriceInDKK * (1 + markupPercent / 100);
  const vatAmount = netSellingPrice * (vatRate / 100);
  const sellingPriceInclVat = netSellingPrice + vatAmount;
  
  const paymentFeeAmount = sellingPriceInclVat * (paymentFeePercent / 100);
  const trueProfit = netSellingPrice - purchasePriceInDKK - packagingCost - paymentFeeAmount;
  const grossMargin = netSellingPrice > 0 ? (trueProfit / netSellingPrice) * 100 : 0;

  const formatDKK = (num: number) => num.toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' kr.';

  const handleNextItemReset = () => {
    setPurchasePriceStr('');
    setTotalShippingStr('');
    setTotalItemsStr('');
    setPackagingStr('');
  };

  const colors = {
    bg: '#030712',
    cardBg: 'rgba(15, 23, 42, 0.75)',
    inputBg: '#0b0f19',
    textMain: '#f8fafc',
    textSecondary: '#94a3b8',
    border: 'rgba(51, 65, 85, 0.6)',
    borderFocus: '#3b82f6',
    accent: '#38bdf8',
    success: '#10b981',
    successBg: 'rgba(6, 78, 59, 0.3)'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    backgroundColor: colors.inputBg,
    color: colors.textMain,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    boxSizing: 'border-box',
    marginTop: '6px',
    outline: 'none',
    transition: 'all 0.2s ease',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontWeight: 600,
    color: colors.textMain,
    marginBottom: '6px',
    fontSize: '13px',
    letterSpacing: '0.2px',
  };

  const helperStyle: React.CSSProperties = {
    fontSize: '12px',
    color: colors.textSecondary,
    marginTop: '5px',
    display: 'block',
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.bg,
      color: colors.textMain,
      padding: 'env(safe-area-inset-top, 24px) 16px 48px 16px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '960px' }}>
        
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '32px', paddingTop: '16px' }}>
          <div style={{ 
            display: 'inline-block',
            backgroundColor: 'rgba(56, 189, 248, 0.1)', 
            color: colors.accent, 
            padding: '6px 14px', 
            borderRadius: '30px', 
            fontSize: '11px', 
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            marginBottom: '12px'
          }}>
            Next-Gen WebApp 2026
          </div>
          <h1 style={{ 
            fontSize: '26px', 
            fontWeight: 800, 
            color: colors.textMain, 
            margin: '0 0 8px 0',
            letterSpacing: '-0.5px'
          }}>
            Moms & Fortjenstberegner
          </h1>
          <p style={{ 
            fontSize: '14px', 
            color: colors.textSecondary, 
            margin: '0',
            maxWidth: '450px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.5'
          }}>
            Præcis prissætning, fragtfordeling og reel bundlinje i ét lynhurtigt flow.
          </p>
        </header>

        {/* Responsivt Layout */}
        <div className="responsive-grid">
          
          {/* VENSTRE KOLONNE: Indtastning */}
          <div style={{ 
            backgroundColor: colors.cardBg, 
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '24px', 
            borderRadius: '20px', 
            border: `1px solid ${colors.border}`,
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colors.border}`, paddingBottom: '12px' }}>
              <h2 style={{ 
                margin: '0', 
                fontSize: '12px', 
                fontWeight: 700, 
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                1. Indkøb & Detaljer
              </h2>
              <button
                onClick={handleNextItemReset}
                style={{
                  background: 'rgba(51, 65, 85, 0.5)',
                  color: '#f8fafc',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'background 0.2s'
                }}
                title="Tøm felter til næste vare"
              >
                🔄 Næste vare
              </button>
            </div>

            {/* Valuta valg */}
            <div>
              <label style={labelStyle}>Indkøbsvaluta</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => setCurrency('EUR')}
                  style={{
                    flex: 1, padding: '12px', borderRadius: '12px', cursor: 'pointer', fontSize: '13px',
                    background: currency === 'EUR' ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : colors.inputBg,
                    color: colors.textMain, border: currency === 'EUR' ? '1px solid #60a5fa' : `1px solid ${colors.border}`, 
                    fontWeight: 600, boxShadow: currency === 'EUR' ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  🇪🇺 EUR (€)
                </button>
                <button 
                  onClick={() => setCurrency('DKK')}
                  style={{
                    flex: 1, padding: '12px', borderRadius: '12px', cursor: 'pointer', fontSize: '13px',
                    background: currency === 'DKK' ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : colors.inputBg,
                    color: colors.textMain, border: currency === 'DKK' ? '1px solid #60a5fa' : `1px solid ${colors.border}`, 
                    fontWeight: 600, boxShadow: currency === 'DKK' ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  🇩🇰 DKK (kr.)
                </button>
              </div>
            </div>

            {currency === 'EUR' && (
              <div>
                <label style={labelStyle}>
                  Valutakurs (EUR til DKK)
                  <input 
                    type="text" 
                    value={exchangeRateStr} 
                    onChange={(e) => setExchangeRateStr(e.target.value)}
                    style={inputStyle}
                  />
                </label>
                <span style={helperStyle}>Standardkurs sat til 7,45.</span>
              </div>
            )}

            <div>
              <label style={labelStyle}>
                Varens indkøbspris ekskl. moms ({currency === 'EUR' ? '€' : 'kr.'})
                <input 
                  type="text" 
                  value={purchasePriceStr} 
                  onChange={(e) => setPurchasePriceStr(e.target.value)}
                  placeholder="F.eks. 4,69"
                  style={inputStyle}
                />
              </label>
            </div>

            {/* Fragt og antal */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>
                  Samlet fragt ({currency === 'EUR' ? '€' : 'kr.'})
                  <input 
                    type="text" 
                    value={totalShippingStr} 
                    onChange={(e) => setTotalShippingStr(e.target.value)}
                    placeholder="F.eks. 75"
                    style={inputStyle}
                  />
                </label>
              </div>
              <div>
                <label style={labelStyle}>
                  Antal varer
                  <input 
                    type="text" 
                    value={totalItemsStr} 
                    onChange={(e) => setTotalItemsStr(e.target.value)}
                    placeholder="F.eks. 36"
                    style={inputStyle}
                  />
                </label>
              </div>
            </div>
            <span style={{ ...helperStyle, marginTop: '-12px' }}>Fragten fordeles automatisk pr. stk.</span>

            <div style={{ height: '1px', backgroundColor: colors.border, margin: '4px 0' }} />

            <h2 style={{ 
              margin: '0', 
              fontSize: '12px', 
              fontWeight: 700, 
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              2. Avance & Omkostninger
            </h2>

            <div>
              <label style={labelStyle}>
                Ønsket avance (%)
                <input 
                  type="text" 
                  value={markupPercentStr} 
                  onChange={(e) => setMarkupPercentStr(e.target.value)}
                  style={inputStyle}
                />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>
                  Emballage (kr.)
                  <input 
                    type="text" 
                    value={packagingStr} 
                    onChange={(e) => setPackagingStr(e.target.value)}
                    placeholder="F.eks. 2"
                    style={inputStyle}
                  />
                </label>
              </div>
              <div>
                <label style={labelStyle}>
                  Kortgebyr (%)
                  <input 
                    type="text" 
                    value={paymentFeeStr} 
                    onChange={(e) => setPaymentFeeStr(e.target.value)}
                    style={inputStyle}
                  />
                </label>
              </div>
            </div>

            <div>
              <label style={labelStyle}>
                Momssats
                <select 
                  value={vatRate} 
                  onChange={(e) => setVatRate(Number(e.target.value))}
                  style={{
                    ...inputStyle, 
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    backgroundSize: '16px',
                    paddingRight: '40px'
                  }}
                >
                  <option value={25} style={{ backgroundColor: '#0f172a', color: '#f8fafc' }}>25% (Standard dansk moms)</option>
                  <option value={0} style={{ backgroundColor: '#0f172a', color: '#f8fafc' }}>0% (Momsfri / Eksport)</option>
                </select>
              </label>
            </div>

          </div>

          {/* HØJRE KOLONNE: Resultatopgørelse */}
          <div style={{ 
            backgroundColor: colors.cardBg, 
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '24px', 
            borderRadius: '20px', 
            border: `1px solid ${colors.border}`,
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '24px'
          }}>
            <div>
              <h2 style={{ 
                margin: '0 0 20px 0', 
                fontSize: '12px', 
                fontWeight: 700, 
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: `1px solid ${colors.border}`,
                paddingBottom: '12px'
              }}>
                Resultatopgørelse & Pris
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                
                {currency === 'EUR' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.textSecondary }}>
                    <span>Fragt lagt til pr. vare:</span> 
                    <span>+ {shippingPerItem.toFixed(2)} € ({formatDKK(shippingPerItem * exchangeRate)})</span>
                  </div>
                )}

                {currency === 'EUR' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.accent }}>
                    <span>Samlet indkøbspris inkl. fragt:</span> 
                    <span style={{ fontWeight: 600 }}>{formatDKK(purchasePriceInDKK)}</span>
                  </div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: colors.textSecondary }}>Salgspris ekskl. moms:</span> 
                  <span style={{ fontWeight: 600, color: colors.textMain }}>{formatDKK(netSellingPrice)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.textSecondary }}>
                  <span>Variable omkostninger:</span>
                  <span>{formatDKK(packagingCost + paymentFeeAmount)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: colors.textSecondary }}>Moms ({vatRate}%):</span> 
                  <span style={{ fontWeight: 600, color: colors.textMain }}>{formatDKK(vatAmount)}</span>
                </div>
                
                {/* Slutpris boks */}
                <div style={{ 
                  backgroundColor: colors.inputBg, 
                  padding: '18px', 
                  borderRadius: '16px', 
                  marginTop: '8px',
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: `1px solid ${colors.border}`
                }}>
                  <div>
                    <span style={{ fontWeight: 600, color: colors.textMain, display: 'block', fontSize: '13px' }}>
                      Pris kunden betaler:
                    </span>
                    <span style={{ fontSize: '11px', color: colors.textSecondary }}>Inkl. alle omkostninger & moms</span>
                  </div>
                  <span style={{ 
                    fontSize: '22px', 
                    fontWeight: 800, 
                    color: colors.accent 
                  }}>
                    {formatDKK(sellingPriceInclVat)}
                  </span>
                </div>

                {/* Reel fortjeneste boks */}
                <div style={{ 
                  backgroundColor: colors.successBg, 
                  padding: '18px', 
                  borderRadius: '16px', 
                  border: `1px solid rgba(16, 185, 129, 0.3)`,
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '4px'
                }}>
                  <div>
                    <span style={{ fontWeight: 700, color: colors.success, display: 'block', fontSize: '14px' }}>
                      Reel fortjeneste pr. stk.
                    </span>
                    <span style={{ fontSize: '12px', color: colors.textSecondary }}>
                      Margin: {grossMargin.toFixed(1)}%
                    </span>
                  </div>
                  <span style={{ 
                    fontSize: '22px', 
                    fontWeight: 800, 
                    color: colors.success 
                  }}>
                    {formatDKK(trueProfit)}
                  </span>
                </div>

              </div>
            </div>

            <div style={{ textAlign: 'center', borderTop: `1px solid ${colors.border}`, paddingTop: '16px' }}>
              <p style={{ fontSize: '11px', color: colors.textSecondary, margin: '0', letterSpacing: '0.3px' }}>
                Optimized for Mobile Retail & Webshop 🚀
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}