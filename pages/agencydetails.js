import { useState } from "react";
import styles from "../components/agencies/AgencyPage.module.css";
import AgencyForm from "../components/agencies/agency-form";
import { getSession } from 'next-auth/react';

function AgencyDetails(props) {
    const {agencyID} = props;

    return(
        <div className={styles.container}>
            {!agencyID ? (
                <h1 className={styles.title}>Add External Agency Details</h1>
            ) : (
                <h1 className={styles.title}>Modify External Agency Details</h1>
            )}
            <AgencyForm agencyID={agencyID}/>
        </div>
    )
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


export default AgencyDetails;
