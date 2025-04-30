import { useState, useEffect, useContext, createContext } from "react";
import { 
    getAllUnicorn, 
    getUnicornByIdService, 
    createUnicorn as createUnicornService, 
    updateUnicorn as updateUnicornService, 
    deleteUnicorn as deleteUnicornService 
} from "../services/UnicornService";
import { generarPDFUnicornios } from "../services/PdfService";

const UnicornContext = createContext();

export const UnicornProvider = ({ children }) => {
    const [unicorns, setUnicorns] = useState([]);

    const getUnicorns = async () => {
        const data = await getAllUnicorn();
        if (!data) return;
        setUnicorns(data);
    };

    useEffect(() => {
        getUnicorns();
    }, []);

    const getUnicornById = async (id) => {
        const unicorn = await getUnicornByIdService(id);
        return unicorn;
    };

    const createUnicorn = async (newUnicorn) => {
        const created = await createUnicornService(newUnicorn);
        await getUnicorns();
        return created;
    };

    const updateUnicorn = async (id, updatedUnicorn) => {
        const updated = await updateUnicornService(id, updatedUnicorn);
        await getUnicorns();
        return updated;
    };

    const deleteUnicorn = async (id) => {
        await deleteUnicornService(id);
        await getUnicorns();
    };

    const generateUnicornPDF = () => {
        if (unicorns.length === 0) {
            console.warn("No hay unicornios para generar el PDF");
            return;
        }
        generarPDFUnicornios(unicorns);
    };

    return (
        <UnicornContext.Provider 
            value={{ 
                unicorns, 
                getUnicorns, 
                getUnicornById, 
                createUnicorn, 
                updateUnicorn, 
                deleteUnicorn,
                generateUnicornPDF
            }}
        >
            {children}
        </UnicornContext.Provider>
    );
};

export const useUnicorns = () => useContext(UnicornContext);
