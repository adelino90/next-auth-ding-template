import { useState } from "react";
import styles from "./AgencyForm.module.css";

function AgencyForm(props) {

    const {agencyID} = props;
    console.log(agencyID)
    return( 
  
    

        <form className={styles.agencyform}>
            <div className={styles.inputGroup}>
                <label htmlFor="externalAgency">External Agency:</label>
                <input
                    type="text"
                    id="externalAgency"
                    name="externalAgency"
                 
                   
                    required
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="agencyType">Agency Type:</label>
                <select
                    id="agencyType"
                    name="agencyType"
                    
                
                    required
                >
                    <option value="">Select Agency Type</option>
                 
                </select>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="parentAgency">Parent Agency:</label>
                <select
                    id="parentAgency"
                    name="parentAgency"
                  
                    required
                >
                    <option value="">Select Parent Agency</option>
                    
                </select>
            </div>
            <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
   )
}

export default AgencyForm;