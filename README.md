## Problema

Datos de salida:
El objetivo es un fichero que contenga la siguiente información:
Estado (string)

B70: Nacimientos en la decada los 70 en ese estado (number)
B80: Nacimientos en la decada los 80 en ese estado (number)
B90: Nacimientos en la decada los 90 en ese estado (number)
B00: Nacimientos en la decada los 2000 en ese estado (number)

Race70: Raza con mayor número de nacimientos en la decada de los 70 en ese estado (string)
Race80: Raza con mayor número de nacimientos en la decada de los 80 en ese estado (string)
Race90: Raza con mayor número de nacimientos en la decada de los 90 en ese estado(string)
Race00: Raza con mayor número de nacimientos en la decada de los 2000 en ese estado (string)

Male: Numero de nacimientos de hombres en los desde el 70 al 2010 (number)
Female: Numero de nacimientos de hombres en los desde el 70 al 2010 (number)
Weight: peso medio en kilos de todos los niños nacidos en ese estado desde el 70 al 2010 (float)
Formato: .csv

## Solución

Procesado de datos.
readSpeed: 163.518ms

Usando createReadStream de nodejs se consigue leer cada fichero sea mucho mas rapido, mejorando la gestion de la memoria.

Usando Promise.all se paralelisa cada ejecucion de leer un fichero.

Los calculos se puede ir acumulando en una key de un objeto el cual todas las promesa puede acceder sin necesidad de controlar la escritura/lectura de la varaible.

Al final del proceso se escriben los resultados en formato json con todas las sumas que se han realizado.
Luego al trasnformarlos a csv se buscan los maximos y medias.
