from abc import ABCMeta, abstractmethod
from sqlalchemy.orm import Session


class Seeder(metaclass=ABCMeta):
    @abstractmethod
    async def run(self, db: Session):
        raise NotImplementedError()