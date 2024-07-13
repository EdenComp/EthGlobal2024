export default function NotFound() {
	return (
		<div
			className={
				"flex flex-col items-center justify-center h-screen w-screen bg-background-tertiary text-neutral-white"
			}
		>
			<h1 className={"font-black"}>404</h1>
			<p className={"body-bold-large"}>
				Go back to{" "}
				<a href={"/"} className={"text-orange-700 hover:text-orange-400"}>
					HOME
				</a>
			</p>
		</div>
	);
}
