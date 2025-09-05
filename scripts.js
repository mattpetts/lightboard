class LightBoard {
	constructor(
		container,
		tiles = 200,
		backgroundHexCodes = [ '#0FF0FC', '#BC13FE', '#BA2BE2', '#FF3131', '#FF5E00' ]
	) {
		this.container = container;
		this.tiles = tiles;
		this.hoverTimeout = 1000;
		this.backgrounds = backgroundHexCodes
		;

		if ( container ) {
			this.mountGridToContainer();
		}
	}

	mountGridToContainer() {
		const container = document.getElementById( this.container );
		const gridItems = this.#generateGridItems( this.tiles );

		if ( container ) {
			gridItems.forEach( item => container.appendChild( item ) );
			this.#attachListeners( gridItems );
		} else {
			throw new Error( `The container ${ this.container } doesn't exist` );
		}
	}

	#generateGridItems( tiles ) {
		let gridItems = [];

		for ( let i = 0; i < tiles; i++ ) {
			const div = document.createElement( 'div' );
			div.className = 'grid-item';
			gridItems.push(div);
		}

		return gridItems
	}

	#attachListeners( gridItems ) {
		gridItems.forEach( item => {
			item.addEventListener( 'mouseover', () => this.#applyHoverEffect( item ) )
		});
	}

	#applyHoverEffect( item ) {
		item.style.backgroundColor = this.#selectRandomBackground( this.backgrounds );
		setTimeout( () => {
			item.style.backgroundColor = '#555555'
		}, this.hoverTimeout )
	}

	#selectRandomBackground( backgrounds ) {
		return backgrounds[ Math.floor( Math.random() * backgrounds.length ) ];
	}
}