export default class Graph {

    constructor(options) {
        this.canvas = document.querySelector(options.el);
        this.context = this.canvas.getContext("2d");
        this.data = {
            lines: {
                count: 7,
                space: 30
            },
            markers: [
                {
                    x: 105.5,
                    y: 156,
                    type: "Round"
                },
                {
                    x: 259,
                    y: 96.5,
                    type: "Round"
                },
                {
                    x: 413,
                    y: 36,
                    type: "Round"
                },
                {
                    x: 567,
                    y: 96.5,
                    type: "Round"
                },
                {
                    x: 721,
                    y: 66,
                    type: "Round"
                },
                {
                    x: 260,
                    y: 61,
                    type: "Triangle"
                },
                {
                    x: 567.5,
                    y: 30,
                    type: "Triangle"
                }
            ],
            months: [
                {
                    text: "octobre",
                    x: 84,
                    y: 216
                },
                {
                    text: "novembre",
                    x: 230,
                    y: 216
                },
                {
                    text: "décembre",
                    x: 387,
                    y: 216
                },
                {
                    text: "janvier",
                    x: 548,
                    y: 216
                },
                {
                    text: "février",
                    x: 705,
                    y: 216
                }
            ],
            legend: [
                {
                    name: "ventes",
                    type: "Round",
                    x: 326,
                    y: 263,
                },
                {
                    name: "commandes",
                    type: "Triangle",
                    x: 387,
                    y: 263,
                },
                {
                    name: "stock",
                    type: "Square",
                    x: 469,
                    y: 263,
                }
            ]
        };

        this.draw();
    }


    draw() {

        this.drawGraph();
        this.drawLines();
        this.drawMarkers();
        this.drawMonths();
        this.drawLegend();

    }

    drawGraph() {
        this.context.globalAlpha = 0.3;
        this.context.beginPath();
        this.context.moveTo(115, 60);
        this.context.bezierCurveTo(138, 22, 175, 9, 192, 6);
        this.context.bezierCurveTo(232, 1, 250, 3, 269, 11);
        this.context.bezierCurveTo(290, 25, 301, 39, 314, 57);
        this.context.bezierCurveTo(343, 99, 358, 116, 371, 132);
        this.context.bezierCurveTo(388, 149, 397, 153, 414, 155);
        this.context.bezierCurveTo(429, 154, 442, 150, 455, 140);
        this.context.bezierCurveTo(476, 123, 508, 98, 529, 82);
        this.context.bezierCurveTo(539, 74, 551, 68, 567, 66);
        this.context.bezierCurveTo(598, 67, 635, 102, 650, 113);
        this.context.bezierCurveTo(681, 136, 708, 152, 774, 179);
        this.context.bezierCurveTo(793, 185, 812, 185, 824, 186);
        this.context.moveTo(824, 186);
        this.context.lineTo(115, 186);
        this.context.lineTo(115, 60);


        this.context.fillStyle = this.createGradient();
        this.context.fill();
    }

    drawLines() {
        let i = 0;
        let space = 0;

        for (i; i < this.data.lines.count; i++) {
            this.drawLine(space);
            space += this.data.lines.space;
        }
    }

    drawLine(space) {
        this.context.globalAlpha = 0.3;
        this.context.beginPath();
        this.context.moveTo(0, 6.5 + space);
        this.context.lineTo(836, 6.5 + space);
        this.context.strokeStyle = "white";
        this.context.stroke();
    }

    drawMarkers() {
        //on apelle dynamiquement la méthode qui va bien pour chaque type de shape
        for (let marker of this.data.markers) {
            this[`draw${marker.type}`](marker);
        }
    }

    drawTriangle(position, centered = false) {
        let high = 9 * (Math.sqrt(3) / 2);
        this.context.globalAlpha = 1;
        this.context.beginPath();

        if (centered) {
            this.context.save();
            this.context.translate(position.x, position.y);

            this.context.moveTo(0, -high / 2);
            this.context.lineTo(-9 / 2, high / 2);
            this.context.lineTo(9 / 2, high / 2);

        }
        else {
            this.context.moveTo(position.x, position.y);
            this.context.lineTo(position.x + 9 / 2, position.y + 9);
            this.context.lineTo(position.x - 9 / 2, position.y + 9);
        }

        this.context.fillStyle = "blue";
        this.context.fill();
        this.context.restore();
    }

    drawRound(position) {
        this.context.globalAlpha = 1;
        this.context.beginPath();
        this.context.arc(position.x, position.y, 4.5, 0, 2 * Math.PI);
        this.context.fillStyle = "#0cff56";
        this.context.fill();
    }

    drawSquare(position, centered) {

        this.context.globalAlpha = 1;
        this.context.beginPath();
        if (centered) {
            this.context.rect(position.x, position.y - 8 / 2, 8, 8);
        }
        else {
            this.context.rect(position.x, position.y, 8, 8);
        }

        this.context.fillStyle = "#e9e9e9";
        this.context.fill();
    }

    drawMonths() {
        for (let month of this.data.months) {
            this.drawText(month.text, month.x, month.y, "12px", "bold");
        }
    }

    drawText(text, x, y, fontSize, fontWeight = "", centered = false) {

        this.context.globalAlpha = 1;
        this.context.font = `${fontWeight} ${fontSize} Arial`;
        this.context.fillStyle = "white";
        if (centered)
            this.context.textBaseline = "middle";
        this.context.fillText(text, x, y);
    }

    drawLegend() {
        for (let legend of this.data.legend) {
            this[`draw${legend.type}`](legend, true);
            this.drawText(legend.name, legend.x + 11, legend.y, "9.5px", "100", true);
        }
    }

    createGradient() {
        let gradient = this.context.createLinearGradient(115, 60, 824, 186);
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(0.1, "rgba(0,0,0,0.5)");
        gradient.addColorStop(0.5, "rgba(0,0,0,0.5)");
        gradient.addColorStop(0.9, "rgba(0,0,0,0.5)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        return gradient;
    }

}