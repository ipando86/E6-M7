const { Sequelize } = require('sequelize');

// 1. Configuración de la conexión a PostgreSQL (Ajusta tus credenciales)
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false // Puesto en false para mantener la consola limpia
});

// 2. Importar e inicializar los modelos
const Usuario = require('./models/usuario')(sequelize);
const Publicacion = require('./models/publicacion')(sequelize);

// 3. Establecer la Relación (Uno a Muchos)
Usuario.hasMany(Publicacion);
Publicacion.belongsTo(Usuario);

// 4. Script asíncrono de sincronización y prueba
const probarRelacion = async () => {
  try {
    // Autenticamos para asegurar que la conexión funciona
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida.');

    // Sincronizamos los modelos (force: true borra y recrea las tablas, útil al probar)
    await sequelize.sync({ force: true });
    console.log('✅ Modelos sincronizados en la base de datos.');

    // --- APLICANDO LOS CONCEPTOS ---

    // Crear un usuario
    const nuevoUsuario = await Usuario.create({ 
      nombre: 'Carlos', 
      email: 'carlos@ejemplo.com' 
    });
    console.log(`👤 Usuario creado: ${nuevoUsuario.nombre}`);

    // Crear una publicación utilizando el método mágico provisto por hasMany
    await nuevoUsuario.createPublicacion({
      titulo: 'Mi primera publicación',
      contenido: 'Este es el contenido de mi post, creado con Sequelize.'
    });
    console.log('📝 Publicación asociada creada con éxito.');

    // Verificar la relación usando Eager Loading (Carga Ansiosa)
    const usuarioConPublicaciones = await Usuario.findByPk(nuevoUsuario.id, {
      include: Publicacion
    });

    console.log('\n--- Resultado de Eager Loading ---');
    console.log(JSON.stringify(usuarioConPublicaciones, null, 2));

  } catch (error) {
    console.error('❌ Error en la ejecución:', error);
  } finally {
    // Cerramos la conexión al terminar
    await sequelize.close();
  }
};

// Ejecutar el script
probarRelacion();