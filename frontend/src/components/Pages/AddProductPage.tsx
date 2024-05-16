import { AddProduct } from "../Product/AddProduct"
import { Page } from "./Page"

export const AddProductPage: React.FC = () => {

	return (
		<Page>
			<AddProduct onSubmit={(p) => console.log(p)} />
		</Page>
	)
}