import {
  SaveOptions,
  FindOptionsWhere,
  MongoRepository,
  ObjectLiteral,
} from "typeorm";

/**
 * Abstract class BaseRepository for performing CRUD operations on a database using TypeORM.
 * @template Entity - The type of the entity for which the repository is being created.
 */
export abstract class BaseRepository<Entity extends ObjectLiteral> {
  /**
   * The TypeORM repository for the entity.
   */
  protected abstract repository: MongoRepository<Entity>;

  /**
   * Finds an entity by its ID.
   * @param {string | number} id - The ID of the entity.
   * @returns {Promise<Entity | undefined>} The entity with the specified ID, or undefined if not found.
   */
  async findOneById(id: string): Promise<Entity | null> {
    return this.repository.findOneBy({ _id: { $eq: id } });
  }

  /**
   * Finds an entity by any field.
   * @param {Object} id - query the entity.
   * @returns {Promise<Entity | undefined>} The entity with the specified ID, or undefined if not found.
   */
  async findOne(query: Object): Promise<Entity | null> {
    return this.repository.findOneBy(query);
  }

  /**
   * Finds all entities that match the given conditions.
   * @param {FindConditions<Entity>} conditions - The conditions to match.
   * @returns {Promise<Entity[]>} An array of entities that match the conditions.
   */
  async findAll(conditions?: FindOptionsWhere<Entity>): Promise<Entity[]> {
    return this.repository.find(conditions);
  }

  /**
   * Creates a new entity and saves it to the database.
   * @param {Partial<Entity>} data - The data for the new entity.
   * @param {SaveOptions} [options] - Optional save options.
   * @returns {Promise<Entity>} The created entity.
   */
  async create(data: Entity, options?: SaveOptions): Promise<Entity> {
    return this.repository.save(data, options);
  }

  /**
   * Updates an entity with the given ID using the provided data.
   * @param {string | number} id - The ID of the entity to update.
   * @param {Partial<Entity>} data - The data to update the entity with.
   * @returns {Promise<Entity>} The updated entity.
   * @throws Will throw an error if the entity with the specified ID is not found.
   */
  async update(id: string, data: Partial<Entity>): Promise<Entity> {
    const entity = await this.findOneById(id);
    if (!entity) {
      throw new Error("Entity not found");
    }

    Object.assign(entity, data);

    return this.repository.save(entity);
  }

  /**
   * Deletes an entity with the given ID.
   * @param {string | number} id - The ID of the entity to delete.
   * @throws Will throw an error if the entity with the specified ID is not found.
   */
  async delete(id: string): Promise<void> {
    const entity = await this.findOneById(id);

    if (!entity) {
      throw new Error("Entity not found");
    }

    await this.repository.remove(entity);
  }
}
