const Footer = () => (
    <footer className="py-5 bg-dark text-light">
		<div className="container">
			<div className="row">
				<div className="col-2">
					<h5>Документы</h5>
					<ul className="nav flex-column">
						<li className="nav-item mb-2"><a href="/news" onClick={(event) => {event.preventRefresh();}} className="nav-link p-0 text-muted">Отчёт</a></li>
					</ul>
				</div>
				<div className="col-4">
					<h5>Технические задания</h5>
					<ul className="nav flex-column">
						<li className="nav-item mb-2"><a href="/news" onClick={(event) => {event.preventRefresh();}} className="nav-link p-0 text-muted">Лабораторный практикум</a></li>
					</ul>
				</div>
				<div className="col-4 offset-1">
					<h5>Свяжитесь с нами</h5>
					<pre>Телефон:  8(888)-888-88-88<p/>Почта:    news@pigeon.ru</pre>
				</div>
			</div>
			<div className="d-flex justify-content-center py-4 my-4 border-top">
				<p>&copy; 2024 Голубиные технологии. Все права не защищены.</p>
			</div>
		</div>
	</footer>
);

export default Footer;