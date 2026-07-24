from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A3
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "plan-estudios-ia-big-data-muestra.pdf"
LOGO = ROOT / "public" / "logos" / "Logo Horizontal" / "blanco.png"
TRIMMED_LOGO = ROOT / "tmp" / "pdfs" / "univamex-logo-white-trimmed.png"

PROGRAM = "Ingeniería en Inteligencia Artificial y Big Data"
META = "10 cuatrimestres  |  50 asignaturas  |  Modalidad escolarizada  |  RVOE 20253798"

PERIODS = [
    ("01", "Primer cuatrimestre", "Bloque básico", ["Matemáticas", "Lógica matemática", "Introducción a la programación", "Física", "Comprensión de textos"]),
    ("02", "Segundo cuatrimestre", "Bloque básico", ["Cálculo diferencial e integral", "Probabilidad y estadística inferencial", "Estructura de datos", "Sistemas dinámicos", "Metodología de la investigación"]),
    ("03", "Tercer cuatrimestre", "Bloque básico", ["Cálculo multivariable", "Teoría de la computación", "Programación orientada a objetos", "Bases de datos", "Habilidades del pensamiento"]),
    ("04", "Cuarto cuatrimestre", "Bloque profesional", ["Métodos numéricos y optimización", "Algoritmos avanzados", "Sistemas operativos", "Análisis numéricos", "Base de datos NoSQL y BIG DATA"]),
    ("05", "Quinto cuatrimestre", "Bloque profesional", ["Aprendizaje automático I", "Introducción a BIG DATA", "Visión artificial I", "Introducción a las redes neuronales", "Programación avanzada"]),
    ("06", "Sexto cuatrimestre", "Bloque profesional", ["Aprendizaje automático II", "Análisis masivo en BIG DATA", "Visión artificial II", "Deep learning y redes neuronales profundas", "Privacidad en BIG DATA"]),
    ("07", "Séptimo cuatrimestre", "Bloque especialización", ["Comprensión de modelos en inteligencia artificial", "Sistemas autónomos I", "Análisis predictivos", "Internet de las cosas (IaT) IA", "Seguridad informática y privacidad de datos"]),
    ("08", "Octavo cuatrimestre", "Bloque especialización", ["Inteligencia artificial aplicada a los negocios", "Sistemas autónomos II", "Algoritmos de aprendizaje profundo", "Optimización de algoritmos en tiempo real", "Computación cuantitativa avanzada"]),
    ("09", "Noveno cuatrimestre", "Bloque especialización", ["Tendencias emergentes en inteligencia artificial y BIG DATA", "Simulación y modelo en BIG DATA", "Diseño de proyectos de inteligencia artificial y BIG DATA", "Diseño y evaluación de datos", "Seminario de innovación en inteligencia artificial"]),
    ("10", "Décimo cuatrimestre", "Bloque especialización", ["Desarrollo de aplicaciones de inteligencia artificial", "Ética profesional en BIG DATA e inteligencia artificial", "Emprendimiento tecnológico en inteligencia artificial y BIG DATA", "Sistemas embebidos para inteligencia artificial", "Seminario de tesis"]),
]

COLORS = {
    "navy": HexColor("#071F4B"),
    "blue": HexColor("#0B3A82"),
    "gold": HexColor("#D7A928"),
    "ink": HexColor("#14213D"),
    "muted": HexColor("#5F6B7C"),
    "paper": HexColor("#F7F9FC"),
    "line": HexColor("#DCE4EF"),
    "Bloque básico": HexColor("#1B6CA8"),
    "Bloque profesional": HexColor("#0B7A75"),
    "Bloque especialización": HexColor("#C58B14"),
}


def fonts():
    regular = Path("C:/Windows/Fonts/arial.ttf")
    bold = Path("C:/Windows/Fonts/arialbd.ttf")
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("UI", regular))
        pdfmetrics.registerFont(TTFont("UI-Bold", bold))
        return "UI", "UI-Bold"
    return "Helvetica", "Helvetica-Bold"


def fit_lines(text, font, size, width, max_lines=3):
    words, lines, current = text.split(), [], ""
    for word in words:
        trial = f"{current} {word}".strip()
        if pdfmetrics.stringWidth(trial, font, size) <= width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    if len(lines) > max_lines:
        lines = lines[:max_lines]
        while pdfmetrics.stringWidth(lines[-1] + "…", font, size) > width and lines[-1]:
            lines[-1] = lines[-1][:-1]
        lines[-1] += "…"
    return lines


def draw_centered_lines(c, lines, x, y, width, font, size, color, leading):
    c.setFillColor(color)
    c.setFont(font, size)
    for index, line in enumerate(lines):
        c.drawCentredString(x + width / 2, y - index * leading, line)


def make_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    TRIMMED_LOGO.parent.mkdir(parents=True, exist_ok=True)
    regular, bold = fonts()
    width, height = A3
    c = canvas.Canvas(str(OUTPUT), pagesize=(width, height))
    c.setTitle(f"Plan de estudios - {PROGRAM}")
    c.setAuthor("Universidad del Valle de México - UNIVAMEX")

    c.setFillColor(white)
    c.rect(0, 0, width, height, stroke=0, fill=1)
    c.setFillColor(COLORS["navy"])
    c.rect(0, height - 92, width, 92, stroke=0, fill=1)
    c.setFillColor(COLORS["gold"])
    c.rect(0, height - 98, width, 6, stroke=0, fill=1)

    with PILImage.open(LOGO).convert("RGBA") as image:
        alpha = image.getchannel("A")
        bbox = alpha.getbbox()
        trimmed = image.crop(bbox) if bbox else image
        trimmed.save(TRIMMED_LOGO)
        iw, ih = trimmed.size
    logo_h = 47
    logo_w = logo_h * iw / ih
    c.drawImage(str(TRIMMED_LOGO), 34, height - 70, width=logo_w, height=logo_h, mask="auto", preserveAspectRatio=True)
    c.setFillColor(white)
    c.setFont(bold, 9)
    c.drawRightString(width - 34, height - 34, "PLAN DE ESTUDIOS")
    c.setFillColor(HexColor("#BFCDE3"))
    c.setFont(regular, 7.6)
    c.drawRightString(width - 34, height - 49, "FORMACIÓN PROFESIONAL")

    c.setFillColor(COLORS["navy"])
    c.setFont(bold, 21)
    c.drawString(34, height - 136, PROGRAM)
    c.setFillColor(COLORS["muted"])
    c.setFont(regular, 8.2)
    c.drawString(35, height - 155, META)

    margin = 34
    list_top = height - 187
    list_bottom = 31
    row_gap = 5
    row_h = (list_top - list_bottom - 9 * row_gap) / 10
    period_w = 142
    subject_gap = 5
    subject_w = (width - 2 * margin - period_w - 4 * subject_gap) / 5

    for index, (number, title, phase, subjects) in enumerate(PERIODS):
        y = list_top - (index + 1) * row_h - index * row_gap
        color = COLORS[phase]

        c.setFillColor(COLORS["paper"])
        c.setStrokeColor(COLORS["line"])
        c.setLineWidth(0.65)
        c.roundRect(margin, y, width - 2 * margin, row_h, 10, stroke=1, fill=1)

        c.setFillColor(color)
        c.roundRect(margin, y, period_w, row_h, 10, stroke=0, fill=1)
        c.rect(margin + period_w - 10, y, 10, row_h, stroke=0, fill=1)
        c.setFillColor(white)
        c.setFont(bold, 16)
        c.drawString(margin + 11, y + row_h - 24, number)
        title_lines = fit_lines(title, bold, 8, period_w - 22, 2)
        draw_centered_lines(c, title_lines, margin, y + row_h - 42, period_w, bold, 8, white, 9.5)
        c.setFillColor(HexColor("#FFFFFF"))
        c.setFont(regular, 5.8)
        c.drawString(margin + 11, y + 10, phase.upper())

        for sidx, subject in enumerate(subjects):
            sx = margin + period_w + sidx * (subject_w + subject_gap)
            card_y = y + 8
            card_h = row_h - 16
            c.setFillColor(white if sidx % 2 == 0 else HexColor("#EAF0F6"))
            c.roundRect(sx, card_y, subject_w, card_h, 7, stroke=0, fill=1)
            lines = fit_lines(subject, regular, 7.15, subject_w - 16, 3)
            leading = 8.4
            text_y = card_y + (card_h + (len(lines) - 1) * leading) / 2 + 2
            draw_centered_lines(c, lines, sx, text_y, subject_w, regular, 7.15, COLORS["ink"], leading)

    c.showPage()
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    make_pdf()
