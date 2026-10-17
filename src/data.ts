export const CHAPTERS = [
  { year: '1989', title: 'El manga', text: 'Masamune Shirow publica el manga original en la revista Young Magazine, de la editorial Kodansha. Ahí nacen la Mayor Motoko Kusanagi y la Sección 9.' },
  { year: '1995', title: 'La película', text: 'Mamoru Oshii dirige la adaptación animada, producida por Production I.G. Es la versión que llevó la saga fuera de Japón.' },
  { year: '2002', title: 'Stand Alone Complex', text: 'Kenji Kamiyama dirige la serie de televisión de Production I.G., una historia nueva dentro del universo de la Sección 9.' },
  { year: '2004', title: 'Innocence', text: 'Mamoru Oshii vuelve a dirigir una película de la saga, con Batou como figura central.' },
  { year: '2017', title: 'Live-action', text: 'Rupert Sanders dirige la adaptación con actores reales, protagonizada por Scarlett Johansson.' },
  { year: '2020', title: 'SAC_2045', text: 'Serie original de Netflix dirigida por Shinji Aramaki y Kenji Kamiyama, en animación 3D.' },
]

export const GLOSSARY = [
  { term: 'Ghost', text: 'La conciencia de una persona: aquello que la hace ser quien es, aunque su cuerpo sea artificial.' },
  { term: 'Shell', text: 'El cuerpo, total o parcialmente cibernético, que alberga al ghost.' },
  { term: 'Sección 9', text: 'La unidad de seguridad pública que investiga crímenes de ciberterrorismo y espionaje.' },
  { term: 'Net', text: 'La red global a la que las mentes pueden conectarse directamente.' },
]

export const BOX_CONTENTS = [
  'Libro de arte con ilustraciones de Shirow',
  'Película de 1995 e Innocence (2004) en alta definición',
  'Serie Stand Alone Complex, edición de coleccionista',
  'Cuatro láminas impresas y numeradas',
  'Banda sonora en vinilo',
]

export const CREDIT_ART = 'Ilustraciones de Shirow Masamune y un fotograma de la película · Fuentes: theghostintheshell.jp e imágenes aportadas por el autor del proyecto · Incluye obras de otras series del autor, mostradas como muestra de su trabajo · © Shirow Masamune / Kodansha / Production I.G.'

export type Work = { id: string; title: string; alt: string }

export const ILLUSTRATIONS: Work[] = [
  { id: 'official-10', title: 'Anillo de interfaz', alt: 'Ilustración de Shirow Masamune: figura de pelo azul agachada frente a un anillo de interfaz.' },
  { id: 'gits-head', title: 'Cabeza mecánica (fotograma)', alt: 'Fotograma animado: una cabeza mecánica blanca con cables, sobre fondo negro y marcas verdes.' },
  { id: 'official-01', title: 'Portada del libro de arte', alt: 'Portada del libro de arte Shirow Masamune Artworks in the Shell, con un collage de personajes.' },
  { id: 'official-02', title: 'Traje blindado y pistola gigante', alt: 'Ilustración de Shirow Masamune: mujer sentada sobre un traje blindado con una pistola enorme.' },
  { id: 'official-03', title: 'Mecha azul y dos jóvenes', alt: 'Ilustración de Shirow Masamune: dos jóvenes junto a un mecha azul frente a una ciudad nocturna.' },
  { id: 'official-04', title: 'Francotiradora y blindado', alt: 'Ilustración de Shirow Masamune: soldado con rifle frente a un gran traje blindado, entre ruinas.' },
  { id: 'official-05', title: 'Mecha claro sobre la ciudad', alt: 'Ilustración de Shirow Masamune: joven sobre un mecha claro que desciende entre edificios.' },
  { id: 'official-06', title: 'Tanque de policía', alt: 'Ilustración de Shirow Masamune: personajes y un tanque con la palabra POLICE.' },
  { id: 'official-07', title: 'Escuadrón del tanque blanco', alt: 'Ilustración de Shirow Masamune: escuadrón de policía con un tanque blanco.' },
  { id: 'official-08', title: 'Guerrera sobre la ciudad de torres', alt: 'Ilustración de Shirow Masamune: guerrera con espada sobre una ciudad de torres.' },
  { id: 'official-09', title: 'Bestia mecánica entre llamas', alt: 'Ilustración de Shirow Masamune: joven con capucha naranja sobre una bestia mecánica entre llamas.' },
]

export const BACKGROUNDS: Work[] = [
  { id: 'bg-79', title: 'Torres al atardecer', alt: 'Fondo pintado: rascacielos recortados contra un sol rojo y nubes.' },
  { id: 'bg-65', title: 'Callejón entre edificios', alt: 'Fondo pintado: callejón estrecho visto desde abajo, entre muros con tuberías y aires acondicionados.' },
  { id: 'bg-92', title: 'Estructuras desde abajo', alt: 'Fondo pintado: vigas y tuberías vistas desde abajo, con un charco blanco en el techo.' },
]

export const CONCEPTS: Work[] = [
  { id: 'sb-025', title: 'Storyboard: cabeza mecánica y cerebro', alt: 'Dos viñetas de storyboard a lápiz: una cabeza mecánica abierta con cables y un cerebro con anotaciones.' },
  { id: 'kd-051', title: 'Dibujos clave: poses con pistola', alt: 'Hoja de dibujos clave a lápiz: una figura sentada que se ajusta las botas y sostiene una pistola.' },
  { id: 'kd-052', title: 'Dibujos clave: manejo del fusil', alt: 'Hoja con ocho dibujos a lápiz de una figura de perfil armando y apuntando un fusil.' },
  { id: 'kd-053', title: 'Dibujos clave: revisando el arma', alt: 'Dos dibujos a lápiz de una figura sentada revisando un fusil.' },
  { id: 'art-105', title: 'Diseño de fusil de asalto', alt: 'Dibujo técnico a tinta de un fusil de asalto desde dos ángulos, con anotaciones en japonés.' },
  { id: 'art-91', title: 'Diseño de pistola', alt: 'Dibujo a tinta de una pistola desde varios ángulos, con vistas frontal y superior.' },
  { id: 'art-c10', title: 'Diseño de tanque de patas', alt: 'Hoja de diseño a tinta de un tanque con seis patas y brazo manipulador.' },
  { id: 'art-c11', title: 'Estudios de tanque de patas', alt: 'Tres bocetos a tinta de un tanque con patas, desde distintos ángulos.' },
  { id: 'tv-016', title: 'Diseño final de tanque', alt: 'Hoja de diseño de un tanque multipata con una silueta humana como referencia de escala.' },
]

export const STORY_ART = ['official-10', 'sb-025', 'kd-051', 'kd-052', 'kd-053', 'official-01']
