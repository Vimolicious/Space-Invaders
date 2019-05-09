class Shield {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 96;
        this.height = 72;

        this.parts = Shield.fillParts(this.x, this.y);
    }

    show() {
        for (let p of this.parts) {
            p.show(this.x, this.y);
        }
    }

    static fillParts(x, y) {
        let parts = [];

        parts.push(new ShieldPart(x, y, 0, 0, [
            [false, false, false, true, true, true],
            [false, false, true, true, true, true],
            [false, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true]
        ]));

        parts.push(new ShieldPart(x, y, 24, 0, [
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true]
        ]));

        parts.push(new ShieldPart(x, y, 48, 0, [
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true]
        ]));

        parts.push(new ShieldPart(x, y, 72, 0, [
            [true, true, true, false, false, false],
            [true, true, true, true, false, false],
            [true, true, true, true, true, false],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true]
        ]));

        parts.push(new ShieldPart(x, y, 0, 24, [
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true]
        ]));

        parts.push(new ShieldPart(x, y, 24, 24, [
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, false, false],
            [true, true, true, false, false, false],
            [true, true, false, false, false, false],
            [true, false, false, false, false, false] 
        ]));

        parts.push(new ShieldPart(x, y, 48, 24, [
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [false, false, true, true, true, true],
            [false, false, false, true, true, true],
            [false, false, false, false, true, true],
            [false, false, false, false, false, true]
        ]));

        parts.push(new ShieldPart(x, y, 72, 24, [
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true]
        ]));

        parts.push(new ShieldPart(x, y, 0, 48, [
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true]
        ]));

        parts.push(new ShieldPart(x, y, 72, 48, [
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true]
        ]));

        return parts
    }
}