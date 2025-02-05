import { useEffect, useState } from "react";
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '../components/agencies/AgencyPage.module.css'
import Link from 'next/link';

function AgencyPage() {
    const [agencyData, setAgencyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedParent, setSelectedParent] = useState("All");
    const router = useRouter();
    useEffect(() => {
        async function fetchAgencyData() {
            try {
                const response = await fetch("/api/agencies/fetchAgencies", { method: "POST" });

                if (!response.ok) {
                    throw new Error("Failed to fetch agency data.");
                }

                const text = await response.text();
                const jsonData = JSON.parse(text);
                setAgencyData(jsonData.nationalGovtAgency);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchAgencyData();
    }, [loading]);

    const parentAgencies = [...new Set(agencyData.map(agency => agency.parent_agency))];
    const filteredAgencies = agencyData.filter(agency => {
        return (
            (selectedParent === "All" || agency.parent_agency === selectedParent) &&
            agency.attached_agency.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    function modifyHandler(agencyId){
        console.log("Modify Agency ID:", agencyId);
        router.push(`/agency/modify/${agencyId}`); // Navigate to the agency details page
    }

    return (
      <div className={styles.container}>
      <h1 className={styles.title}>National Government Agencies</h1>
      <div className={styles.filters}>
          <label htmlFor="parent-agency">Filter by Parent Agency: </label>
          <select name="parent-agency" value={selectedParent} onChange={(e) => setSelectedParent(e.target.value)}>
              <option value="All">All</option>
              {parentAgencies.map((parent, index) => (
                  <option key={index} value={parent}>{parent}</option>
              ))}
          </select>
          <input 
              type="text" 
              placeholder="Search by Attached Agency" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
          />
           <Link href="/agencydetails" className={styles.button}>
                Add New Agency
            </Link>
      </div>
      <ul className={styles.list}>
          {loading && <li>...Loading</li>}
          {!loading && filteredAgencies.length > 0 ? (
              filteredAgencies.map((agency, index) => (
                  <li key={index}>
                      <strong>{agency.attached_agency}</strong> (ID: {agency.attached_agency_id})
                      <br />
                      Parent Agency: {agency.parent_agency} (ID: {agency.parent_agency_id})
                      <br/>
                      <button onClick={() =>modifyHandler(agency.attached_agency_id)}>Modify</button>
                  </li>
              ))
          ) : (
              !loading && <li>No data available</li>
          )}
      </ul>
  </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }
    return { props: { session } };
}

export default AgencyPage;
