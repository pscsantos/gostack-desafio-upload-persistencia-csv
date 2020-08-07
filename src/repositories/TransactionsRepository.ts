import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionsRepository = await getRepository(Transaction);
    const transactions = await transactionsRepository.find();

    const income = transactions.reduce((total, element) => {
      if (element.type === 'income') {
        return (total += element.value);
      }
      return total;
    }, 0);

    const outcome = transactions.reduce((total, element) => {
      if (element.type === 'outcome') {
        return (total += element.value);
      }
      return total;
    }, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }
}

export default TransactionsRepository;
