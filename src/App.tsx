import { useState } from 'react';

export default function App() {
  const [currency, setCurrency] = useState<'DKK' | 'EUR'>('EUR');
  
  // Felter starter tomme eller klar til hurtig indtastning
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

  // Funktion til at nulstille varedata til næste vare med ét klik
  const handleNextItemReset = () => {
    setPurchasePriceStr('');
    setTotalShippingStr('');
    setTotalItemsStr('');
    setPackagingStr('');
  };

  const colors = {
    bg: '#0f172a',
    cardBg: '#1e293b',
    inputBg: '#0f172a',
    textMain: '#f8fafc',
    textSecondary: '#94a3b8',
    border: '#334155',
    borderFocus: '#3b82f6',
    accent: '#60a5fa',
    success: '#10b981',
    successBg: '#064e3b33'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    fontSize: '15px',
    backgroundColor: colors.inputBg,
    color: colors.textMain,
    border: `1px solid ${colors.border}`,
    borderRadius: '10px',
    boxSizing: 'border-box',
    marginTop: '6px',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontWeight: 600,
    color: colors.textMain,
    marginBottom: '6px',
    fontSize: '14px',
  };

  const helperStyle: React.CSSProperties = {
    fontSize: '12px',
    color: colors.textSecondary,
    marginTop: '4px',
    display: 'block',
  };

  return (
    <div style={{ 
      fontFamily: '"Inter", system-ui, sans-serif', 
      minHeight: '100vh',
      backgroundColor: colors.bg,
      color: colors.textMain,
      padding: '32px 16px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ 
            backgroundColor: '#3b82f622', 
            color: colors.accent, 
            padding: '4px 12px', 
            borderRadius: '20px', 
            fontSize: '12px', 
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Professionel Prissætter
          </span>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 800, 
            color: colors.textMain, 
            margin: '12px 0 6px 0',
            letterSpacing: '-0.5px'
          }}>
            Butiks & Webshop Momsberegner
          </h1>
          <p style={{ 
            fontSize: '14px', 
            color: colors.textSecondary, 
            margin: '0' 
          }}>
            Beregn den rigtige salgspris, indregn fragt og se din faktiske fortjeneste med et øjekast.
          </p>
        </header>

        {/* To-kolonne Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '24px',
          alignItems: 'start'
        }}>
          
          {/* VENSTRE KOLONNE: Indtastning */}
          <div style={{ 
            backgroundColor: colors.cardBg, 
            padding: '24px', 
            borderRadius: '16px', 
            border: `1px solid ${colors.border}`,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colors.border}`, paddingBottom: '10px' }}>
              <h2 style={{ 
                margin: '0', 
                fontSize: '15px', 
                fontWeight: 700, 
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                1. Vare- og indkøbsdetaljer
              </h2>
              <button
                onClick={handleNextItemReset}
                style={{
                  background: '#334155',
                  color: '#f8fafc',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Tøm felter til næste vare"
              >
                🔄 Næste vare / Nulstil
              </button>
            </div>

            {/* Valuta valg */}
            <div>
              <label style={labelStyle}>Indkøbsvaluta</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => setCurrency('EUR')}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
                    background: currency === 'EUR' ? colors.borderFocus : colors.inputBg,
                    color: colors.textMain, border: `1px solid ${colors.border}`, fontWeight: 600
                  }}
                >
                  🇪🇺 EUR (€) - EU-køb
                </button>
                <button 
                  onClick={() => setCurrency('DKK')}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
                    background: currency === 'DKK' ? colors.borderFocus : colors.inputBg,
                    color: colors.textMain, border: `1px solid ${colors.border}`, fontWeight: 600
                  }}
                >
                  🇩🇰 DKK (kr.) - Dansk
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
                <span style={helperStyle}>Standard er ca. 7,45 for euro.</span>
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
              <span style={helperStyle}>Prisen du betaler til din leverandør pr. stk.</span>
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
                    placeholder="F.eks. 75,00"
                    style={inputStyle}
                  />
                </label>
              </div>
              <div>
                <label style={labelStyle}>
                  Antal varer i ordre
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
            <span style={{ ...helperStyle, marginTop: '-10px' }}>Fragten fordeles automatisk ligeligt ud på alle varerne.</span>

            <h2 style={{ 
              margin: '10px 0 0 0', 
              fontSize: '15px', 
              fontWeight: 700, 
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: `1px solid ${colors.border}`,
              paddingBottom: '10px'
            }}>
              2. Avance & Omkostninger
            </h2>

            <div>
              <label style={labelStyle}>
                Ønsket avance / fortjeneste (%)
                <input 
                  type="text" 
                  value={markupPercentStr} 
                  onChange={(e) => setMarkupPercentStr(e.target.value)}
                  style={inputStyle}
                />
              </label>
              <span style={helperStyle}>Hvor mange procent du vil lægge oven i din kostpris.</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>
                  Emballage pr. stk. (kr.)
                  <input 
                    type="text" 
                    value={packagingStr} 
                    onChange={(e) => setPackagingStr(e.target.value)}
                    placeholder="F.eks. 2,00"
                    style={inputStyle}
                  />
                </label>
              </div>
              <div>
                <label style={labelStyle}>
                  Kortgebyr / Betaling (%)
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
                Momssats til staten
                <select 
                  value={vatRate} 
                  onChange={(e) => setVatRate(Number(e.target.value))}
                  style={{...inputStyle, cursor: 'pointer'}}
                >
                  <option value={25} style={{ backgroundColor: colors.cardBg }}>25% (Standard dansk moms)</option>
                  <option value={0} style={{ backgroundColor: colors.cardBg }}>0% (Momsfri / Eksport)</option>
                </select>
              </label>
            </div>

          </div>

          {/* HØJRE KOLONNE: Resultatopgørelse */}
          <div style={{ 
            backgroundColor: colors.cardBg, 
            padding: '24px', 
            borderRadius: '16px', 
            border: `1px solid ${colors.border}`,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'sticky',
            top: '24px'
          }}>
            <div>
              <h2 style={{ 
                margin: '0 0 20px 0', 
                fontSize: '15px', 
                fontWeight: 700, 
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                borderBottom: `1px solid ${colors.border}`,
                paddingBottom: '10px'
              }}>
                Resultatopgørelse & Pris
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                
                {currency === 'EUR' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.textSecondary, fontSize: '13px' }}>
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
                
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                  <span style={{ color: colors.textSecondary }}>Salgspris ekskl. moms:</span> 
                  <span style={{ fontWeight: 600, color: colors.textMain }}>{formatDKK(netSellingPrice)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.textSecondary, fontSize: '13px' }}>
                  <span>Variable omkostninger (Emballage + Gebyr):</span>
                  <span>{formatDKK(packagingCost + paymentFeeAmount)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: colors.textSecondary }}>Moms ({vatRate}% som opkræves):</span> 
                  <span style={{ fontWeight: 600, color: colors.textMain }}>{formatDKK(vatAmount)}</span>
                </div>
                
                {/* Slutpris boks */}
                <div style={{ 
                  backgroundColor: colors.inputBg, 
                  padding: '16px', 
                  borderRadius: '12px', 
                  marginTop: '8px',
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: `1px solid ${colors.border}`
                }}>
                  <div>
                    <span style={{ fontWeight: 600, color: colors.textMain, display: 'block', fontSize: '14px' }}>
                      Pris kunden betaler:
                    </span>
                    <span style={{ fontSize: '12px', color: colors.textSecondary }}>Inkl. alle omkostninger og moms</span>
                  </div>
                  <span style={{ 
                    fontSize: '22px', 
                    fontWeight: 800, 
                    color: colors.accent 
                  }}>
                    {formatDKK(sellingPriceInclVat)}
                  </span>
                </div>

                <div style={{ height: '1px', backgroundColor: colors.border, margin: '8px 0' }} />
                
                {/* Reel fortjeneste boks */}
                <div style={{ 
                  backgroundColor: colors.successBg, 
                  padding: '18px', 
                  borderRadius: '12px', 
                  border: `1px solid ${colors.success}55`,
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontWeight: 700, color: colors.success, display: 'block', fontSize: '15px' }}>
                      Reel fortjeneste pr. stk.
                    </span>
                    <span style={{ fontSize: '12px', color: colors.textSecondary }}>
                      Når alt er betalt (Tjeneste-margin: {grossMargin.toFixed(1)}%)
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

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', color: colors.textSecondary, margin: '0' }}>
                Klar til produktion • Klik på "Næste vare / Nulstil" øverst for at rydde felterne.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}