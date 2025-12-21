from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

from app.database import Base
from app.config import get_settings

# Import ALL models so Alembic sees them
from app.models.user import User
from app.models.transaction import Transaction
from app.models.budget import Budget
from app.models.merchant import MerchantMaster
from app.models.embedding import Embedding
from app.models.portfolio import PortfolioHolding
from app.models.recurrence import Recurrence
from app.models.blockchain import MerkleBatch, UserCorrection
from app.models.audit_log import AuditLog

config = context.config
fileConfig(config.config_file_name)

target_metadata = Base.metadata


def get_url():
    settings = get_settings()
    return settings.database_url


def run_migrations_offline():
    context.configure(
        url=get_url(),
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    connectable = engine_from_config(
        {"sqlalchemy.url": get_url()},
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
