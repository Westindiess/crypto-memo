import { createContext, useContext, useMemo } from "react"
import { useCurrencies } from "../hooks/useCurrencies"

const CurrenciesContext = createContext()

export const CurrenciesContextProvider = ({ children }) => {
	const { loading, error, currencies } = useCurrencies()
	const value = useMemo(() => {
		return { loading, error, currencies }
	}, [loading, error, currencies])
	return (
		<CurrenciesContext.Provider value={value}>
			{children}
		</CurrenciesContext.Provider>
	)
}

export const useCurrenciesContext = () => {
	const context = useContext(CurrenciesContext)
	if (context === undefined) {
		throw new Error(
			"You must use useCurrenciesContext inse the CurrenciesContextProvider"
		)
	}
	return context
}
