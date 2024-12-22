import { analyzeIpo, getRecommendationStyle } from '../utils/ipoAnalysis.js';

const getEmailTemplate = (type, data) => {
  const templates = {
    confirmSubscription: ({ confirmationUrl }) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirm your IPO Watch subscription</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #1f2937;">
          <!-- Header -->
          <div style="background: #1e40af; padding: 32px 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">IPO Watch</h1>
            <p style="color: #93c5fd; margin: 8px 0 0;">Smart Investment Decisions</p>
          </div>
          
          <!-- Main Content -->
          <div style="max-width: 600px; margin: 0 auto; padding: 32px 24px;">
            <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 24px;">Welcome to IPO Watch! 🎉</h2>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 24px; margin: 0 0 24px;">
              Thank you for subscribing to IPO Watch. To start receiving our expert IPO recommendations and market insights, please confirm your email address.
            </p>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="${confirmationUrl}" 
                 style="display: inline-block; background: #2563eb; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Confirm My Subscription
              </a>
            </div>
            
            <div style="background: #fef2f2; border: 1px solid #fee2e2; padding: 16px; border-radius: 8px; margin: 24px 0;">
              <p style="color: #991b1b; font-size: 14px; margin: 0;">
                ⚠️ Important: If you don't see this email in your inbox, please check your spam/junk folder and mark us as "not spam" to ensure you receive our updates.
              </p>
            </div>
            
            <p style="color: #6b7280; font-size: 14px;">
              If you didn't request this subscription, you can safely ignore this email.
            </p>
            
            <!-- Features -->
            <div style="margin: 48px 0; padding: 24px; background: #f3f4f6; border-radius: 8px;">
              <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 16px;">What you'll get:</h3>
              <ul style="margin: 0; padding: 0 0 0 24px; color: #4b5563;">
                <li style="margin-bottom: 8px;">Daily IPO recommendations</li>
                <li style="margin-bottom: 8px;">Real-time Grey Market Premium updates</li>
                <li style="margin-bottom: 8px;">Expert market analysis</li>
                <li style="margin-bottom: 0;">Timely investment insights</li>
              </ul>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f3f4f6; padding: 32px 24px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 16px;">
              © ${new Date().getFullYear()} IPO Watch. All rights reserved.
            </p>
            <div style="color: #6b7280; font-size: 12px;">
              <p style="margin: 0 0 8px;">
                You're receiving this email because you signed up for IPO Watch updates.
              </p>
              <p style="margin: 0;">
                Our address: Mumbai, Maharashtra, India
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    
    dailyIpoUpdate: ({ ipos, date }) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>IPO Watch Daily Update</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #1f2937;">
          <!-- Header -->
          <div style="background: #1e40af; padding: 32px 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">IPO Watch Daily Update</h1>
            <p style="color: #93c5fd; margin: 8px 0 0;">Your Daily IPO Intelligence - ${date}</p>
          </div>
          
          <!-- Main Content -->
          <div style="max-width: 600px; margin: 0 auto; padding: 32px 24px;">
            <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 24px;">Today's Active IPOs 🚀</h2>
            
            ${ipos.length === 0 ? `
              <p style="color: #4b5563; text-align: center; padding: 32px 0;">
                No active IPOs today. We'll notify you when new IPOs become available.
              </p>
            ` : `
              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
                  <thead>
                    <tr style="background: #f3f4f6;">
                      <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Company</th>
                      <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Price (₹)</th>
                      <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">GMP</th>
                      <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Listing Gains</th>
                      <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb;">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${ipos.map(ipo => {
                      const { recommendation, analysis } = analyzeIpo(ipo);
                      const style = getRecommendationStyle(recommendation);
                      
                      return `
                        <tr>
                          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                            <div style="font-weight: 500;">${ipo.companyName}</div>
                            <div style="font-size: 14px; color: #6b7280;">${ipo.type || ''}</div>
                          </td>
                          <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">
                            ${ipo.price}
                          </td>
                          <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">
                            <div style="color: ${ipo.gmp.startsWith('+') ? '#059669' : '#dc2626'};">
                              ${ipo.gmp}
                            </div>
                          </td>
                          <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">
                            <div style="color: ${parseFloat(ipo.listingGains) > 0 ? '#059669' : '#dc2626'};">
                              ${ipo.listingGains}
                            </div>
                          </td>
                          <td style="padding: 12px; text-align: center; border-bottom: 1px solid #e5e7eb;">
                            <div style="
                              display: inline-block;
                              padding: 4px 12px;
                              border-radius: 9999px;
                              font-size: 14px;
                              font-weight: 500;
                              background: ${style.background};
                              color: ${style.color};"
                            >
                              ${recommendation}
                            </div>
                          </td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
              
              <div style="margin: 32px 0; padding: 24px; background: #f3f4f6; border-radius: 8px;">
                <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 16px;">Our Analysis</h3>
                <ul style="margin: 0; padding: 0 0 0 24px; color: #4b5563;">
                  ${ipos.map(ipo => {
                    const { analysis } = analyzeIpo(ipo);
                    return `
                      <li style="margin-bottom: 16px;">
                        <strong>${ipo.companyName}:</strong> 
                        ${analysis}
                      </li>
                    `;
                  }).join('')}
                </ul>
              </div>
            `}
          </div>
          
          <!-- Footer -->
          <div style="background: #f3f4f6; padding: 32px 24px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 16px;">
              © ${new Date().getFullYear()} IPO Watch. All rights reserved.
            </p>
            <div style="color: #6b7280; font-size: 12px;">
              <p style="margin: 0;">
                You're receiving this email because you subscribed to IPO Watch updates.
                <a href="\${unsubscribeUrl}" style="color: #4b5563; text-decoration: underline;">Unsubscribe</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `
  };

  return templates[type](data);
};

export default getEmailTemplate; 