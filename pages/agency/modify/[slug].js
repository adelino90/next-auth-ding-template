import { Fragment } from "react";
import Head from 'next/head'
import styles from "../../../components/agencies/AgencyForm.module.css";
import AgencyDetails from "../../agencydetails";
import { useRouter } from 'next/router'
function PostDetailpage(){
    const router = useRouter()
    const participantId = router.query.slug
    return <Fragment>  
           
                <AgencyDetails agencyID={participantId}/>
            </Fragment>
}

export default PostDetailpage