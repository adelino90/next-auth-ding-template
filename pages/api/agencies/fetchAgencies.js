const xml2js = require('xml2js');
const { TextDecoder } = require('util');

export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
    const url = "https://apps.dpwh.gov.ph/pis_api_training/WebService.asmx";
  
    const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                   xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                   xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Header>
        <UserDetails xmlns="https://www.dpwh.gov.ph/">
          <userName>pis-api</userName>
          <password>pis-api</password>
        </UserDetails>
      </soap:Header>
      <soap:Body>
        <ioms_get_national_govt_agency xmlns="https://www.dpwh.gov.ph/" />
      </soap:Body>
    </soap:Envelope>`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          "SOAPAction": "https://www.dpwh.gov.ph/ioms_get_national_govt_agency",
        },
        body: soapRequest,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      response.text().then((xmlString) => {
        // Initialize the xml2js parser
        const parser = new xml2js.Parser({ explicitArray: false });
    
        // Parse the XML string
        parser.parseString(xmlString, (err, result) => {
            if (err) {
                console.error("Error parsing XML:", err);
                return;
            }
          
            // Navigate the parsed object structure
            const nationalGovtAgency = result['soap:Envelope']['soap:Body']['ioms_get_national_govt_agencyResponse']['ioms_get_national_govt_agencyResult'];

            res.status(200).json({ nationalGovtAgency:nationalGovtAgency.NationalGovtAgency });
        });
    }).catch((error) => {
        console.error("Error fetching SOAP API:", error);
    });
      
    } catch (error) {
      console.error("Error fetching SOAP API:", error);
      res.status(500).json({ error: "Failed to fetch SOAP API" });
    }
  }