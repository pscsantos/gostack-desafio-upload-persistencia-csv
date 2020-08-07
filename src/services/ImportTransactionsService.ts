// import neatCsv from 'neat-csv';
import csv from 'csvtojson';
import fs from 'fs';

import path from 'path';
import uploadConfig from '../config/upload';
import Transaction from '../models/Transaction';

import CreateTransactionService from './CreateTransactionService';

interface Request {
  csvFilename: string;
}
class ImportTransactionsService {
  async execute({ csvFilename }: Request): Promise<Transaction[]> {
    const createTransactionService = new CreateTransactionService();
    const pathCsvFile = path.join(uploadConfig.directory, csvFilename);

    // const datas = await neatCsv(await fs.promises.readFile(pathCsvFile));
    const transactionscsv = await csv().fromFile(pathCsvFile);

    for (const transaction of transactionscsv) {
      const { title, type, value, category } = transaction;
      await createTransactionService.execute({
        title,
        type,
        value,
        category,
      });
    }

    return transactionscsv;
  }
}

export default ImportTransactionsService;
