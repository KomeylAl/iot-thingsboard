'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface TenantProps {
   params: {
      tenantId: string;
   }
}

const Tenant = ({ params }: TenantProps) => {

   const [tenant, setTenant] = useState({});

   const fetchTenant = async () => {
      await axios.get(`/api/sysadmin/tenants/${params.tenantId}`)
         .then(function (response) {
            console.log(response.data)
         })
         .catch(function (error) {
            console.log(error)
         })
         .finally(() => {})
   }

   useEffect(() => {
      fetchTenant();
   }, [])

  return (
    <div>
      
    </div>
  )
}

export default Tenant