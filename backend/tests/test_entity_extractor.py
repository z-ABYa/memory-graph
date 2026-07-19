from app.graph.entity_extractor import EntityExtractor

extractor = EntityExtractor()

entities = extractor.extract(

    """
    My name is Chetan.
    I live in Jaipur.
    I study at SKIT.
    My favourite language is Java.
    """

)

print(entities)