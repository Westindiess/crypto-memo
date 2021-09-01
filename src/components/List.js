import { matchSorter } from "match-sorter"
import { useState, useCallback, useMemo, memo } from "react"
import { useCurrenciesContext } from "../context/CurrenciesContext"
import Currency from "./Currency"

const List = () => {
	const { error, loading, currencies } = useCurrenciesContext()
	const [filter, setFilter] = useState("")
	const [active, setActive] = useState(null)

	const displayedCurrencies = useMemo(() => {
		const filteredCurrencies = filter
			? matchSorter(currencies, filter, { keys: ["name", "symbol"] })
			: currencies
		return filteredCurrencies.slice(0, 500)
	}, [currencies, filter])

	const hideDetails = useCallback(() => setActive(null), [])
	const showDetails = useCallback((id) => setActive(id), [])

	return (
		<div className="container p-4 py-5 px-lg-5">
			{loading ? (
				<p>loading... it can take a while...</p>
			) : (
				<>
					<div className="mb-3">
						<label htmlFor="filter" className="form-label">
							Filter currencies
						</label>
						<input
							id="filter"
							value={filter}
							onChange={(e) => setFilter(e.target.value)}
							className="form-control"
						/>
					</div>
					<p>
						{displayedCurrencies.length} first results / {currencies.length}
					</p>
					{displayedCurrencies.map((el) => {
						return (
							<Currency
								key={el.id}
								currency={el}
								isActive={el.id === active}
								showDetails={showDetails}
								hideDetails={hideDetails}
							/>
						)
					})}
				</>
			)}
			{error && <p>{error}</p>}
		</div>
	)
}

export default memo(List)
