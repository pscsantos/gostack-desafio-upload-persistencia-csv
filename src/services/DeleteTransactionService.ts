import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactionsExists = await transactionsRepository.findOne(id);

    if (transactionsExists) {
      await transactionsRepository.remove(transactionsExists);
    }
  }
}

export default DeleteTransactionService;
