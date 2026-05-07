const connection = require("../data/db")

const index = (req, res) => {

    const sql = `
    SELECT 
    p.id,
    p.slug,
    p.name,
    p.description,
    p.price,
    p.color,
    p.material,
    p.size,
    p.stock,
    p.img_url,
    p.category,
    p.is_featured,
    p.created_at,
    b.name AS brand_name,
    b.slug AS brand_slug,
    a.name AS animal_name,
    a.slug AS animal_slug
    FROM products p
    JOIN brands b ON b.id = p.brand_id
    JOIN animal_types a ON a.id = p.animal_type_id
    ORDER BY p.created_at DESC`;

    connection.query(sql, (err, results) => {

        if (err) return res.status(500).json({
            error: true,
            message: "Database error"
        })

        res.json(results)
    })

}

const show = (req, res) => {
    const { slug } = req.params;

    // 1. Prodotto + brand + animale
    const productSql =
        `  SELECT 
      p.id,
      p.slug,
      p.name,
      p.description,
      p.price,
      p.color,
      p.material,
      p.size,
      p.stock,
      p.img_url,
      p.category,
      p.is_featured,
      p.created_at,
      b.id   AS brand_id,
      b.name AS brand_name,
      b.slug AS brand_slug,
      b.logo_url AS brand_logo,
      a.id   AS animal_id,
      a.name AS animal_name,
      a.slug AS animal_slug
    FROM products p
    JOIN brands b       ON b.id = p.brand_id
    JOIN animal_types a ON a.id = p.animal_type_id
    WHERE p.slug = ?
    LIMIT 1`
        ;


    connection.query(productSql, [slug], (err, productResults) => {

        if (err) return res.status(500).json({
            error: true,
            message:"Database error err" 
        })

        if (productResults.length === 0) {
            return res.status(404).json({ error: "Prodotto non trovato" });
        }

        const product = productResults[0];

       

            // 3. Prodotti correlati
            const relatedSql =
                ` SELECT 
          p.slug,
          p.name,
          p.price,
                    p.img_url,
          b.name AS brand_name
        FROM products p
        JOIN brands b ON b.id = p.brand_id
        WHERE p.id != ?
          AND (p.brand_id = ? OR p.category = ?)
        ORDER BY RAND()
        LIMIT 4`
                ;

            connection.query(relatedSql, [product.id, product.brand_id, product.category], (err, relatedResults) => {

                if (err) return res.status(500).json({
                    error: true,
                    message: "Database error"
                })

                // 4. Compongo la risposta finale
                res.json({
                    ...product,
                    related: relatedResults,
                });
            }
            );
        });
    ;
}

module.exports = { index, show }