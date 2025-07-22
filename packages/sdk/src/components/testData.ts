export const testData = {
  header: {
    "trace-id": "221f497aa9c1e3ea46db88b24521d3ad",
    "trace-url":
      "http://sps.beta.shopastro.com/admin-api/v1/traces/221f497aa9c1e3ea46db88b24521d3ad",
  },
  validateResult: [],
  data: {
    paymentServiceProviders: [
      {
        id: 665120950750466,
        merchantConfiguration: {
          spsMerchantId: "665130060779394",
          environment: "TEST",
          autoCapture: "false",
          clientId:
            "AVohRbwB-7SSFY-Ri9fc2J8lu5Wavfi09SdMVB24dL4zubjNUAuv8q0OOemeUw3hn-qgS0AiCA7x1GvD",
          webhookId: "4L584495A2105512L",
          updatePaymentAmount: "true",
          enable3DS: "false",
          clientSecret:
            "EMaHsuwjeI3zkIgq36__ANJ9hgdfs4HGKRv3pAzXNN9wYORBdb12xek3nuW3O40mAUNvqeFlcuEQr_30",
          spsMerchantAlias: "PAYPAL-1",
        },
        paymentConfiguration: {
          paymentMethods: [
            {
              name: "paypal",
              type: "wallet",
            },
            {
              name: "paypal",
              type: "fast",
            },
          ],
          storedPaymentMethods: [],
        },
        type: "PAYPAL",
        authMeta: {},
        sort: 1,
        localPaySort: 0,
      },
      {
        id: 665120950750467,
        merchantConfiguration: {
          environmentRegion: "-na",
          spsMerchantId: "699178850366768",
          environment: "TEST",
          autoCapture: "false",
          clientId: "PN10036_c40cf1458222",
          clientSecret: "sfAL3X2SqCfZ3pyR",
          spsMerchantAlias: "KLARNA-english",
        },
        paymentConfiguration: {
          paymentMethods: [
            {
              name: "Pay over time",
              type: "klarna_sps_pay_over_time",
              metadata: {
                asset_urls: {
                  descriptive:
                    "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg",
                  standard:
                    "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg",
                },
                identifier: "pay_over_time",
              },
              sort: 1,
            },
          ],
          storedPaymentMethods: [],
        },
        type: "KLARNA",
        authMeta: {
          session_id: "62bdfc90-0240-662a-b99b-55746e68a628",
          token:
            "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgyMzA1ZWJjLWI4MTEtMzYzNy1hYTRjLTY2ZWNhMTg3NGYzZCJ9.eyJzZXNzaW9uX2lkIjoiNjJiZGZjOTAtMDI0MC02NjJhLWI5OWItNTU3NDZlNjhhNjI4IiwiYmFzZV91cmwiOiJodHRwczovL2pzLnBsYXlncm91bmQua2xhcm5hLmNvbS9uYS9rcCIsImRlc2lnbiI6ImtsYXJuYSIsImxhbmd1YWdlIjoiZW4iLCJwdXJjaGFzZV9jb3VudHJ5IjoiVVMiLCJlbnZpcm9ubWVudCI6InBsYXlncm91bmQiLCJtZXJjaGFudF9uYW1lIjoiWW91ciBidXNpbmVzcyBuYW1lIiwic2Vzc2lvbl90eXBlIjoiUEFZTUVOVFMiLCJjbGllbnRfZXZlbnRfYmFzZV91cmwiOiJodHRwczovL25hLnBsYXlncm91bmQua2xhcm5hZXZ0LmNvbSIsInNjaGVtZSI6dHJ1ZSwiZXhwZXJpbWVudHMiOlt7Im5hbWUiOiJrcGMtb3NtLXdpZGdldCIsInZhcmlhdGUiOiJ2MSJ9LHsibmFtZSI6ImtwYy1hYmUiLCJ2YXJpYXRlIjoidmFyaWF0ZS0xIn0seyJuYW1lIjoia3BjLXBzZWwtNDQyOSIsInZhcmlhdGUiOiJhIn0seyJuYW1lIjoia3AtY2xpZW50LW9uZS1wdXJjaGFzZS1mbG93IiwidmFyaWF0ZSI6InZhcmlhdGUtMSJ9LHsibmFtZSI6ImtwYy0xay1zZXJ2aWNlIiwidmFyaWF0ZSI6InZhcmlhdGUtMSJ9LHsibmFtZSI6ImtwLWNsaWVudC11dG9waWEtc3RhdGljLXdpZGdldCIsInZhcmlhdGUiOiJpbmRleCIsInBhcmFtZXRlcnMiOnsiZHluYW1pYyI6InRydWUifX0seyJuYW1lIjoia3AtY2xpZW50LXV0b3BpYS1mbG93IiwidmFyaWF0ZSI6InZhcmlhdGUtMSJ9LHsibmFtZSI6ImtwLWNsaWVudC11dG9waWEtc2RrLWZsb3ciLCJ2YXJpYXRlIjoidmFyaWF0ZS0xIn0seyJuYW1lIjoia3AtY2xpZW50LXV0b3BpYS13ZWJ2aWV3LWZsb3ciLCJ2YXJpYXRlIjoidmFyaWF0ZS0xIn1dLCJyZWdpb24iOiJ1cyIsIm9yZGVyX2Ftb3VudCI6NTU2MDAsIm9mZmVyaW5nX29wdHMiOjIsIm9vIjoiN2ciLCJ2ZXJzaW9uIjoidjEuMTAuMC0xNTkwLWczZWJjMzkwNyJ9.Is8II847f2E0yqK1uvQLuTsjHwA48kG4hyI7OD3WM2g6x3OhGfg5YaGk4b8cVwxmGzW5GfHClihLsKdyg55pIOspjkFTEBHcQo_Ti6P3Ey0Gcv5NHpQdUwMq5WzChCAL-XM5jCCsjeXZNaxlmhJVFbpmM5_MK3QEqkPXaExIgcwZ_vGjVmwHvTJC-o9UTdtvWyFoNz1_U5dc9n_rRq_o5dqPqrUcwb4uJsJq-gYb1dGxUL_m2Hxx9SCGhqbS1LfWzvw2t8UPE_sgjQXkRPf7a8KWu-ychT8mjGpToMYVCX9SQKwTEGgjeT4LezDLza8VfUU8X6YrlUfunB0niAKgvQ",
        },
        sort: 3,
        localPaySort: 0,
      },
      {
        id: 665120950750468,
        merchantConfiguration: {
          spsMerchantId: "816563368625024",
          environment: "TEST",
          autoCapture: "false",
          enable3DS: "true",
          spsRemoveKeys: "secretKey,processing_channel_id,signature_key",
          publicKey: "pk_sbox_hnm4eeothapejqqez7nifckcuu7",
          spsMerchantAlias: "CHECKOUT-1",
        },
        paymentConfiguration: {
          paymentMethods: [
            {
              name: "Apple Pay",
              type: "applepay",
              brands: ["visa", "masterCard", "amex"],
            },
            {
              name: "Google Pay",
              type: "googlepay",
            },
            {
              name: "Credit Card",
              type: "card",
              brands: ["Visa", "Mastercard", "Amex"],
            },
          ],
          storedPaymentMethods: [],
        },
        type: "CHECKOUT",
        authMeta: {
          payment_session_secret: "pss_938986f1-193f-4b15-8e41-7b3b03aedca7",
          _links: {
            self: {
              href: "https://api.sandbox.checkout.com/payment-sessions/ps_30Dr9M22MLGVAAQTjWpC8GpaEWB",
            },
          },
          payment_session_token:
            "YmFzZTY0:eyJpZCI6InBzXzMwRHI5TTIyTUxHVkFBUVRqV3BDOEdwYUVXQiIsImVudGl0eV9pZCI6ImVudF9seXplaGRiN2w1aXpsb3RpdXZqdWlpczRieSIsImV4cGVyaW1lbnRzIjp7fSwicHJvY2Vzc2luZ19jaGFubmVsX2lkIjoicGNfaDdjZmZteWJ1Y2xlcGppeWJseGppZG9jZnEiLCJhbW91bnQiOjU1NjAwLCJsb2NhbGUiOiJlbi1HQiIsImN1cnJlbmN5IjoiVVNEIiwicGF5bWVudF9tZXRob2RzIjpbeyJ0eXBlIjoiY2FyZCIsImNhcmRfc2NoZW1lcyI6WyJWaXNhIiwiTWFzdGVyY2FyZCIsIkFtZXgiXSwic2NoZW1lX2Nob2ljZV9lbmFibGVkIjpmYWxzZSwic3RvcmVfcGF5bWVudF9kZXRhaWxzIjoiZGlzYWJsZWQiLCJiaWxsaW5nX2FkZHJlc3MiOnsiYWRkcmVzc19saW5lMSI6IjExMjM0IEFuZGVyc29uIFN0ICAgICIsImFkZHJlc3NfbGluZTIiOiIiLCJjaXR5IjoiTG9tYSBMaW5kYSIsInN0YXRlIjoiQ0EiLCJ6aXAiOiI5MjM1MC0xNzE2IiwiY291bnRyeSI6IlVTIn19LHsidHlwZSI6ImFwcGxlcGF5IiwiZGlzcGxheV9uYW1lIjoiTmFuSmluZyIsImNvdW50cnlfY29kZSI6IkdCIiwiY3VycmVuY3lfY29kZSI6IlVTRCIsIm1lcmNoYW50X2NhcGFiaWxpdGllcyI6WyJzdXBwb3J0czNEUyJdLCJzdXBwb3J0ZWRfbmV0d29ya3MiOlsidmlzYSIsIm1hc3RlckNhcmQiLCJhbWV4Il0sInRvdGFsIjp7ImxhYmVsIjoiTmFuSmluZyIsInR5cGUiOiJmaW5hbCIsImFtb3VudCI6IjU1NiJ9fSx7InR5cGUiOiJnb29nbGVwYXkiLCJtZXJjaGFudCI6eyJpZCI6IjA4MTEzMDg5Mzg2MjY4ODQ5OTgyIiwibmFtZSI6Ik5hbkppbmciLCJvcmlnaW4iOiJodHRwczovL3Nob3AuZGV2LXNob3AubGlseXNpbGsuY29tIn0sInRyYW5zYWN0aW9uX2luZm8iOnsidG90YWxfcHJpY2Vfc3RhdHVzIjoiRklOQUwiLCJ0b3RhbF9wcmljZSI6IjU1NiIsImNvdW50cnlfY29kZSI6IkdCIiwiY3VycmVuY3lfY29kZSI6IlVTRCJ9LCJjYXJkX3BhcmFtZXRlcnMiOnsiYWxsb3dlZF9hdXRoX21ldGhvZHMiOlsiUEFOX09OTFkiLCJDUllQVE9HUkFNXzNEUyJdLCJhbGxvd2VkX2NhcmRfbmV0d29ya3MiOlsiVklTQSIsIk1BU1RFUkNBUkQiLCJBTUVYIl19fV0sImZlYXR1cmVfZmxhZ3MiOlsiYW5hbHl0aWNzX29ic2VydmFiaWxpdHlfZW5hYmxlZCIsImNhcmRfZmllbGRzX2VuYWJsZWQiLCJnZXRfd2l0aF9wdWJsaWNfa2V5X2VuYWJsZWQiLCJsb2dzX29ic2VydmFiaWxpdHlfZW5hYmxlZCIsInJpc2tfanNfZW5hYmxlZCIsInVzZV9ub25fYmljX2lkZWFsX2ludGVncmF0aW9uIl0sInJpc2siOnsiZW5hYmxlZCI6ZmFsc2V9LCJtZXJjaGFudF9uYW1lIjoiTmFuSmluZyIsInBheW1lbnRfc2Vzc2lvbl9zZWNyZXQiOiJwc3NfOTM4OTg2ZjEtMTkzZi00YjE1LThlNDEtN2IzYjAzYWVkY2E3IiwiaW50ZWdyYXRpb25fZG9tYWluIjoiYXBpLnNhbmRib3guY2hlY2tvdXQuY29tIn0=",
          id: "ps_30Dr9M22MLGVAAQTjWpC8GpaEWB",
        },
        sort: 2,
        localPaySort: 4,
      },
    ],
  },
  success: true,
};

// const testData = {
//   header: {
//     "trace-id": "7d29caac3e8347f2cf3bd55a547e1695",
//     "trace-url":
//       "http://sps.beta.shopastro.com/admin-api/v1/traces/7d29caac3e8347f2cf3bd55a547e1695",
//   },
//   validateResult: [],
//   data: {
//     paymentServiceProviders: [
//       {
//         id: 665120950750466,
//         merchantConfiguration: {
//           spsMerchantId: "665130060779394",
//           environment: "TEST",
//           autoCapture: "false",
//           clientId:
//             "AVohRbwB-7SSFY-Ri9fc2J8lu5Wavfi09SdMVB24dL4zubjNUAuv8q0OOemeUw3hn-qgS0AiCA7x1GvD",
//           webhookId: "4L584495A2105512L",
//           updatePaymentAmount: "true",
//           enable3DS: "false",
//           clientSecret:
//             "EMaHsuwjeI3zkIgq36__ANJ9hgdfs4HGKRv3pAzXNN9wYORBdb12xek3nuW3O40mAUNvqeFlcuEQr_30",
//           spsMerchantAlias: "PAYPAL-1",
//         },
//         paymentConfiguration: {
//           paymentMethods: [
//             {
//               name: "paypal",
//               type: "wallet",
//             },
//             {
//               name: "paypal",
//               type: "fast",
//             },
//           ],
//           storedPaymentMethods: [],
//         },
//         type: "PAYPAL",
//         authMeta: {},
//         sort: 0,
//         localPaySort: 0,
//       },
//       {
//         id: 665120950750464,
//         merchantConfiguration: {
//           spsMerchantId: "708446299307815",
//           autoCapture: "false",
//           environment: "TEST",
//           payEnvironment: "live-us",
//           clientKey: "test_6CLPOYJUKBAY7FH2UPOEJJRD4Q64TA5Y",
//           enable3DS: "true",
//           spsRemoveKeys:
//             "ApiKey,merchantAccount,webhookHmachey,webhookUsername,webhookPassword",
//           spsMerchantAlias: "ADYEN-2",
//         },
//         paymentConfiguration: {
//           paymentMethods: [
//             {
//               name: "Apple Pay",
//               type: "applepay",
//               configuration: {
//                 merchantId: "000000000208560",
//                 merchantName: "Lilysilk072_SHOPASTRO_TEST",
//               },
//               brands: ["amex", "jcb", "mc", "visa"],
//               sort: 1,
//             },
//             {
//               name: "Google Pay",
//               type: "googlepay",
//               configuration: {
//                 merchantId: "50",
//                 gatewayMerchantId: "Lilysilk072_SHOPASTRO_TEST",
//               },
//               sort: 2,
//             },
//             {
//               name: "Pay later with Klarna.",
//               type: "klarna",
//               sort: 4,
//             },
//             {
//               name: "Pay over time with Klarna.",
//               type: "klarna_account",
//               sort: 4,
//             },
//             {
//               name: "Clearpay",
//               type: "clearpay",
//               sort: 12,
//             },
//           ],
//           storedPaymentMethods: [],
//         },
//         type: "ADYEN",
//         sort: 0,
//         localPaySort: 0,
//       },
//       {
//         id: 665120950750468,
//         merchantConfiguration: {
//           spsMerchantId: "1031426171137723",
//           environment: "TEST",
//           autoCapture: "false",
//           enable3DS: "true",
//           spsRemoveKeys: "secretKey,processing_channel_id,signature_key",
//           publicKey: "pk_sbox_irquky6uuvnlo4arnlnc27m5zye",
//           spsMerchantAlias: "CHECKOUT-UK",
//         },
//         paymentConfiguration: {
//           paymentMethods: [
//             {
//               name: "Credit Card",
//               type: "card",
//               brands: ["Visa", "Mastercard", "Amex"],
//             },
//           ],
//           storedPaymentMethods: [],
//         },
//         type: "CHECKOUT",
//         authMeta: {
//           payment_session_secret: "pss_28be8211-b9da-4dd5-8f9d-7d4408236f41",
//           _links: {
//             self: {
//               href: "https://api.sandbox.checkout.com/payment-sessions/ps_30AjBtVdHEpac0rtqijveC7CKwj",
//             },
//           },
//           payment_session_token:
//             "YmFzZTY0:eyJpZCI6InBzXzMwQWpCdFZkSEVwYWMwcnRxaWp2ZUM3Q0t3aiIsImVudGl0eV9pZCI6ImVudF9kY290Znpsb2FjandrcnZheG9temN4dXlscSIsImV4cGVyaW1lbnRzIjp7fSwicHJvY2Vzc2luZ19jaGFubmVsX2lkIjoicGNfN3NzdGMyeGd4aWd1N2twNWdkM2lmZnM0ZnUiLCJhbW91bnQiOjg5MDAsImxvY2FsZSI6ImVuLUdCIiwiY3VycmVuY3kiOiJHQlAiLCJwYXltZW50X21ldGhvZHMiOlt7InR5cGUiOiJjYXJkIiwiY2FyZF9zY2hlbWVzIjpbIlZpc2EiLCJNYXN0ZXJjYXJkIl0sInNjaGVtZV9jaG9pY2VfZW5hYmxlZCI6ZmFsc2UsInN0b3JlX3BheW1lbnRfZGV0YWlscyI6ImRpc2FibGVkIiwiYmlsbGluZ19hZGRyZXNzIjp7ImFkZHJlc3NfbGluZTEiOiJVbml0IDQyIDItNCBBbmRlcnNvbiBTdHJlZXQgICAiLCJhZGRyZXNzX2xpbmUyIjoiIiwiY2l0eSI6IlBvcnQgR2xhc2dvdyIsInN0YXRlIjoiSW52ZXJjbHlkZSIsInppcCI6IlBBMTQgNUVQIiwiY291bnRyeSI6IkdCIn19XSwiZmVhdHVyZV9mbGFncyI6WyJhbmFseXRpY3Nfb2JzZXJ2YWJpbGl0eV9lbmFibGVkIiwiY2FyZF9maWVsZHNfZW5hYmxlZCIsImdldF93aXRoX3B1YmxpY19rZXlfZW5hYmxlZCIsImxvZ3Nfb2JzZXJ2YWJpbGl0eV9lbmFibGVkIiwicmlza19qc19lbmFibGVkIiwidXNlX25vbl9iaWNfaWRlYWxfaW50ZWdyYXRpb24iXSwicmlzayI6eyJlbmFibGVkIjpmYWxzZX0sIm1lcmNoYW50X25hbWUiOiJNZXJjaGFudCIsInBheW1lbnRfc2Vzc2lvbl9zZWNyZXQiOiJwc3NfMjhiZTgyMTEtYjlkYS00ZGQ1LThmOWQtN2Q0NDA4MjM2ZjQxIiwiaW50ZWdyYXRpb25fZG9tYWluIjoiYXBpLnNhbmRib3guY2hlY2tvdXQuY29tIn0=",
//           id: "ps_30AjBtVdHEpac0rtqijveC7CKwj",
//         },
//         sort: 0,
//         localPaySort: 0,
//       },
//     ],
//   },
//   success: true,
// };

// const testData = {
//   header: {
//     "trace-id": "14292ee3339bbe09601c370fde85b45b",
//     "trace-url":
//       "http://sps.beta.shopastro.com/admin-api/v1/traces/14292ee3339bbe09601c370fde85b45b",
//   },
//   validateResult: [],
//   data: {
//     paymentServiceProviders: [
//       {
//         id: 665120950750466,
//         merchantConfiguration: {
//           spsMerchantId: "712839438311534",
//           environment: "TEST",
//           autoCapture: "false",
//           clientId:
//             "AVohRbwB-7SSFY-Ri9fc2J8lu5Wavfi09SdMVB24dL4zubjNUAuv8q0OOemeUw3hn-qgS0AiCA7x1GvD",
//           webhookId: "4L584495A2105512L",
//           updatePaymentAmount: "true",
//           enable3DS: "false",
//           clientSecret:
//             "EMaHsuwjeI3zkIgq36__ANJ9hgdfs4HGKRv3pAzXNN9wYORBdb12xek3nuW3O40mAUNvqeFlcuEQr_30",
//           spsMerchantAlias: "PAYPAL-1",
//         },
//         paymentConfiguration: {
//           paymentMethods: [
//             {
//               name: "paypal",
//               type: "wallet",
//             },
//           ],
//           storedPaymentMethods: [],
//         },
//         type: "PAYPAL",
//         authMeta: {},
//         sort: 0,
//         localPaySort: 0,
//       },
//       {
//         id: 665120950750468,
//         merchantConfiguration: {
//           spsMerchantId: "1074541334186126",
//           environment: "TEST",
//           autoCapture: "false",
//           enable3DS: "true",
//           spsRemoveKeys: "secretKey,processing_channel_id,signature_key",
//           publicKey: "pk_sbox_irquky6uuvnlo4arnlnc27m5zye",
//           spsMerchantAlias: "CHECKOUT-UK",
//         },
//         paymentConfiguration: {
//           paymentMethods: [
//             {
//               name: "Credit Card",
//               type: "card",
//               brands: ["Visa", "Mastercard", "Amex"],
//             },
//           ],
//           storedPaymentMethods: [],
//         },
//         type: "CHECKOUT",
//         authMeta: {
//           payment_session_secret: "pss_549a30b8-777a-4ede-8365-a7bfea460414",
//           _links: {
//             self: {
//               href: "https://api.sandbox.checkout.com/payment-sessions/ps_30AkSAgwr0SxHusfm38nAlYQIal",
//             },
//           },
//           payment_session_token:
//             "YmFzZTY0:eyJpZCI6InBzXzMwQWtTQWd3cjBTeEh1c2ZtMzhuQWxZUUlhbCIsImVudGl0eV9pZCI6ImVudF9kY290Znpsb2FjandrcnZheG9temN4dXlscSIsImV4cGVyaW1lbnRzIjp7fSwicHJvY2Vzc2luZ19jaGFubmVsX2lkIjoicGNfN3NzdGMyeGd4aWd1N2twNWdkM2lmZnM0ZnUiLCJhbW91bnQiOjkzNTcsImxvY2FsZSI6ImVuLUdCIiwiY3VycmVuY3kiOiJFVVIiLCJwYXltZW50X21ldGhvZHMiOlt7InR5cGUiOiJjYXJkIiwiY2FyZF9zY2hlbWVzIjpbIlZpc2EiLCJNYXN0ZXJjYXJkIl0sInNjaGVtZV9jaG9pY2VfZW5hYmxlZCI6ZmFsc2UsInN0b3JlX3BheW1lbnRfZGV0YWlscyI6ImRpc2FibGVkIiwiYmlsbGluZ19hZGRyZXNzIjp7ImFkZHJlc3NfbGluZTEiOiIxMjM0IFNoZXR0bGVzdG9uIFJvYWQgICAgIiwiYWRkcmVzc19saW5lMiI6IjExMjM0IiwiY2l0eSI6IkdsYXNnb3ciLCJzdGF0ZSI6IkdsYXNnb3cgQ2l0eSIsInppcCI6IkczMiA3UEciLCJjb3VudHJ5IjoiR0IifX1dLCJmZWF0dXJlX2ZsYWdzIjpbImFuYWx5dGljc19vYnNlcnZhYmlsaXR5X2VuYWJsZWQiLCJjYXJkX2ZpZWxkc19lbmFibGVkIiwiZ2V0X3dpdGhfcHVibGljX2tleV9lbmFibGVkIiwibG9nc19vYnNlcnZhYmlsaXR5X2VuYWJsZWQiLCJyaXNrX2pzX2VuYWJsZWQiLCJ1c2Vfbm9uX2JpY19pZGVhbF9pbnRlZ3JhdGlvbiJdLCJyaXNrIjp7ImVuYWJsZWQiOmZhbHNlfSwibWVyY2hhbnRfbmFtZSI6Ik1lcmNoYW50IiwicGF5bWVudF9zZXNzaW9uX3NlY3JldCI6InBzc181NDlhMzBiOC03NzdhLTRlZGUtODM2NS1hN2JmZWE0NjA0MTQiLCJpbnRlZ3JhdGlvbl9kb21haW4iOiJhcGkuc2FuZGJveC5jaGVja291dC5jb20ifQ==",
//           id: "ps_30AkSAgwr0SxHusfm38nAlYQIal",
//         },
//         sort: 0,
//         localPaySort: 0,
//       },
//       {
//         id: 665120950750469,
//         merchantConfiguration: {
//           spsMerchantId: "867147194823252",
//           environment: "TEST",
//           autoCapture: "false",
//           clientId: "yR9ewuDmRPaUn80tQJtK_w",
//           googleMerchantName: "lilysilk",
//           enable3DS: "true",
//           spsRemoveKeys: "apiKey,signature_key",
//           spsMerchantAlias: "AIRWALLEX-uk",
//         },
//         paymentConfiguration: {
//           paymentMethods: [
//             {
//               name: "Apple Pay",
//               type: "applepay",
//               brands: ["visa", "masterCard", "amex"],
//             },
//             {
//               name: "Google Pay",
//               type: "googlepay",
//             },
//           ],
//           storedPaymentMethods: [],
//         },
//         type: "AIRWALLEX",
//         authMeta: {
//           amount: 93.57,
//           available_payment_method_types: [
//             "paypost",
//             "airwallex_pay",
//             "card",
//             "bitpay",
//             "p24",
//             "multibanco",
//             "sepa_direct_debit",
//             "maxima",
//             "perlas_terminals",
//             "klarna",
//             "paypal",
//             "wechatpay",
//             "eps",
//             "narvesen",
//             "paysera",
//             "ideal",
//             "mybank",
//             "alipaycn",
//             "trustly",
//             "sofort",
//             "skrill",
//             "bancontact",
//             "paysafecard",
//             "satispay",
//             "paysafecash",
//             "applepay",
//             "googlepay",
//           ],
//           currency: "EUR",
//           id: "int_hkdm8g52nh9ewt0w8k9",
//           client_secret:
//             "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTMwNzc3NjIsImV4cCI6MTc1MzA4MTM2MiwidHlwZSI6ImNsaWVudC1zZWNyZXQiLCJwYWRjIjoiSEsiLCJhY2NvdW50X2lkIjoiMmJmMGQwNjYtMzAzMi00M2U2LWI0YTgtZTVkMzY4Nzg5YTg0IiwiaW50ZW50X2lkIjoiaW50X2hrZG04ZzUybmg5ZXd0MHc4azkiLCJjdXN0b21lcl9pZCI6ImN1c19oa2RtcTRneHdoOWV3cnY4aDQ0IiwiYnVzaW5lc3NfbmFtZSI6IkRlbW8gZm9yIExpbHlTaWxrVUsifQ.7tTFhPUhpwO0oEGXU9TV0PQ0BazoueDd9XDGKr0pibg",
//           billing: {
//             address: {
//               country_code: "GB",
//               city: "Glasgow",
//               street: "1234 Shettleston Road    ",
//               postcode: "G32 7PG",
//               state: "Glasgow City",
//             },
//             last_name: "li",
//             phone_number: "18987890987",
//             first_name: "li",
//             email: "tengzhangkun@bybest.cn",
//           },
//           customer: {
//             merchant_customer_id: "1059945535461520_1204255229190065",
//             client_secret:
//               "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTMwNzc3NjIsImV4cCI6MTc1MzA4MTM2MiwidHlwZSI6ImNsaWVudC1zZWNyZXQiLCJwYWRjIjoiSEsiLCJhY2NvdW50X2lkIjoiMmJmMGQwNjYtMzAzMi00M2U2LWI0YTgtZTVkMzY4Nzg5YTg0IiwiY3VzdG9tZXJfaWQiOiJjdXNfaGtkbXE0Z3h3aDlld3J2OGg0NCIsImJ1c2luZXNzX25hbWUiOiJEZW1vIGZvciBMaWx5U2lsa1VLIn0.uHZJ49kwOtuGkfEtezPDAsKAfFqr-YsE3NuOKbw6q64",
//             id: "cus_hkdmq4gxwh9ewrv8h44",
//             request_id: "1204255229190065-1753077692315",
//           },
//         },
//         sort: 0,
//         localPaySort: 0,
//       },
//     ],
//   },
//   success: true,
// };
