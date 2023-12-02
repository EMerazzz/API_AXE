const express = require('express');
const router = express.Router();
const mysqldump = require('mysqldump');
const fs = require('fs');
const path = require('path');
const os = require('os');
const jwt = require('jsonwebtoken');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const multer = require('multer');


const uploadDirectory = 'uploads/';

// Verificar si la carpeta 'uploads/' existe, si no, crearla
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

const upload = multer({ dest: uploadDirectory });


// Ruta para generar el backup
router.post('/SEGURIDAD/BACKUP', async (req, res) => {
    try {
        // Verificar el token JWT
       /* const decodedToken = await new Promise((resolve, reject) => {
            jwt.verify(req.token, global.secrectTokenAccess, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });*/

        // Si el token es válido, continuar con la generación del respaldo
        const databaseConfig = {
            host: '82.180.162.18',
            user: 'axe',
            password: 'Python2023@@',
            database: 'axe',
        };

        // Generar el nombre del archivo de backup con la fecha actual
        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const formattedTime = `${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
        const formattedDateTime = `${formattedDate}_${formattedTime}`;

        const backupFileName = `backup-AXE-${formattedDateTime}.sql`;
        const backupDirectory = path.join(__dirname, 'backups');
        const backupFilePath = path.join(backupDirectory, backupFileName);

        // Crear el directorio si no existe
        if (!fs.existsSync(backupDirectory)) {
            fs.mkdirSync(backupDirectory);
        }

        // Configuración para la generación del backup
       const dumpCommand = `/usr/bin/mysqldump -h ${databaseConfig.host} -u ${databaseConfig.user} -p${databaseConfig.password} --routines --databases ${databaseConfig.database} > ${backupFilePath}`;
       // const dumpCommand = `\node_modules\.bin\mysqldump -h ${databaseConfig.host} -u ${databaseConfig.user} -p"${databaseConfig.password}" --routines --databases ${databaseConfig.database} > "${backupFilePath}"`;

        // Generar el backup
        await exec(dumpCommand);

        // Enviar el archivo de backup como respuesta
        res.json({ message: 'Archivo de respaldo creado con éxito.' });

    } catch (error) {
        console.error('Error al generar el backup:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Nueva ruta para descargar el archivo de respaldo
router.get('/SEGURIDAD/DESCARGAR-BACKUP/:filename', async (req, res) => {
    try {

        //En caso que se posea un token valido.
        const filename = req.params.filename;
        const backupDirectory = path.join(__dirname, 'backups');  // Ajusta esto según tu estructura de directorios en el servidor
        const filePath = path.join(backupDirectory, filename);

        // Verificar si el archivo existe
        try {
            await fs.promises.access(filePath);  // Intenta acceder al archivo
        } catch (error) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }

        // Configurar el encabezado de la respuesta para la descarga
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', 'application/sql');

        // Crear un flujo de lectura del archivo y enviarlo como respuesta
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        return res.status(200).json({ Message: 'Archivo encontrado' });

    } catch (error) {
        console.error('Error al descargar el archivo de respaldo:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


// Ruta para eliminar todos los archivos de respaldo en la carpeta
router.delete('/SEGURIDAD/BACKUP-DELETE-ALL', async (req, res) => {
    // Verificar el token JWT
            /*
    const decodedToken = await new Promise((resolve, reject) => {

        jwt.verify(req.token, 'my_ultrasecret_token', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
*/
    //En caso que el token sea valido.
    const backupDirectory = path.join(__dirname, 'backups');

    try {
        // Verificar si la carpeta de backups existe
        if (fs.existsSync(backupDirectory)) {
            // Obtener la lista de archivos en la carpeta de backups
            const files = fs.readdirSync(backupDirectory);

            // Eliminar cada archivo
            files.forEach((filename) => {
                const filePath = path.join(backupDirectory, filename);
                fs.unlinkSync(filePath);
            });

            res.json({ message: 'Todos los archivos de respaldo han sido eliminados con éxito.' });
        } else {
            res.status(404).json({ error: 'Carpeta de respaldos no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar archivos de respaldo:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al eliminar archivos de respaldo' });
    }
});


//API que solo borra un respaldo.
router.delete('/SEGURIDAD/BACKUP-DELETE/:filename', async (req, res) => {
    // Verificar el token JWT
    /*
    const decodedToken = await new Promise((resolve, reject) => {
        jwt.verify(req.token, 'my_ultrasecret_token', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
    */
    //En caso que el token sea valido.
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'backups', filename);

    try {
        // Verificar si el archivo existe antes de intentar eliminarlo
        if (fs.existsSync(filePath)) {
            // Eliminar el archivo
            await new Promise((resolve, reject) => {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo de respaldo:', err.message);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            res.json({ message: 'Archivo de respaldo eliminado con éxito.' });
        } else {
            res.status(404).json({ error: 'Archivo de respaldo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al eliminar el archivo de respaldo' });
    }
});


// Ruta para obtener la lista de archivos .sql en la carpeta de backup
router.get('/SEGURIDAD/BACKUP-LIST', async (req, res) => {
    // Verificar el token JWT
            /*
    const decodedToken = await new Promise((resolve, reject) => {

        jwt.verify(req.token, 'my_ultrasecret_token', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
    */

    //En caso que el token sea valido.
    const backupDirectory = path.join(__dirname, 'backups');

    try {
        // Verificar si la carpeta de backups existe
        if (fs.existsSync(backupDirectory)) {
            // Obtener la lista de archivos en la carpeta de backups con extensión .sql
            const sqlFiles = fs.readdirSync(backupDirectory).filter(file => path.extname(file) === '.sql');

            res.json({ 'Archivos de respaldo': sqlFiles });
        } else {
            res.status(404).json({ error: 'Carpeta de respaldos no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la lista de archivos de respaldo:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al obtener la lista de archivos de respaldo' });
    }
});

router.post('/SEGURIDAD/RESTAURAR-BACKUP', upload.single('backupFile'), async (req, res) => {
    try {
        /*
        // Verificar el token JWT
        const decodedToken = await new Promise((resolve, reject) => {
            jwt.verify(req.token, 'my_ultrasecret_token', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
*/
    //En caso que el token sea valido.
        const databaseConfig = {
            host: '82.180.162.18',
            user: 'axe',
            password: 'Python2023@@',
            database: 'axe',
        };

        // Verificar si se proporcionó un archivo en la solicitud
        if (!req.file) {
            return res.status(400).json({ error: 'Debe proporcionar un archivo de respaldo.' });
        }

        const backupFilePath = req.file.path;

        // Restaurar la base de datos desde el archivo de respaldo
        const restoreCommand = `/usr/bin/mysql -h ${databaseConfig.host} -u ${databaseConfig.user} -p${databaseConfig.password} ${databaseConfig.database} < ${backupFilePath}`;

        await exec(restoreCommand);

        // Eliminar el archivo temporal si se cargó
        fs.unlinkSync(backupFilePath);

        // Enviar respuesta exitosa
        res.json({ message: 'Base de datos restaurada con éxito.' });
    } catch (error) {
        console.error('Error al restaurar la base de datos:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al restaurar la base de datos.' });
    }
});


module.exports = router;

