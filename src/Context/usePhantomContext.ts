/* eslint-disable no-unused-vars */
import { useContext } from "react";
import PhantomContext from "./PhantomContext";

function usePhantomContext() {
    return useContext(PhantomContext);
}

export default usePhantomContext;
