// import { useState } from 'react';
// import { useJwt } from 'react-jwt';

import GuestHeader from "./headers/GuestHeader";
// import UserHeader from "./headers/UserHeader";

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlX2lkIjoyLCJpYXQiOjE2MzU0NTUyODd9.c39qT0E90QiwBhFOKPML4PylBn-_l-OIBfJWDr6LaM0';

function Root(props) {
    // const { decodedToken } = useJwt(token);
    //
    // const [header, setHeader] = useState(GuestHeader);


    // if (localStorage.getItem('token') && !header._source.fileName.includes('UserHeader')) {
    //     setHeader(UserHeader);
    // }
    //
    // if (localStorage.getItem('token') && !header._source.fileName.includes('UserHeader')) {
    //     setHeader(GuestHeader);
    // }

    return (
        <div>
            <div>
                <GuestHeader />
            </div>
            <div className="container">
                {props.children}
            </div>
        </div>

    );
}

export default Root;
