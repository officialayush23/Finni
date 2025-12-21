# app/models/all_models.py
# app/models/all_models.py

import uuid
import enum
from datetime import datetime, date

from sqlalchemy import (
    Column, String, Boolean, Numeric, Date, DateTime,
    ForeignKey, Text, UniqueConstraint
)
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB, ARRAY, UUID
from pgvector.sqlalchemy import Vector

from app.core.database import Base


# =========================
# Enums
# =========================

class AssetType(str, enum.Enum):
    STOCK = "stock"
    CRYPTO = "crypto"
    BOND = "bond"
    MUTUAL_FUND = "mutual_fund"
    GOLD = "gold"
    REAL_ESTATE = "real_estate"


class IncomeType(str, enum.Enum):
    SALARY = "salary"
    BUSINESS = "business"
    RENTAL = "rental"
    DIVIDEND = "dividend"
    INTEREST = "interest"
    OTHER = "other"


class TxnSource(str, enum.Enum):
    OCR = "ocr"
    SMS = "sms"
    NOTIFICATION = "notification"
    CSV = "csv"
    MANUAL = "manual"
    BLOCKCHAIN = "blockchain"


class RateType(str, enum.Enum):
    FIXED = "fixed"
    MARKET_LINKED = "market_linked"
    API_DRIVEN = "api_driven"


# =========================
# 1. Users & Wallets
# =========================

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False)
    full_name = Column(String(255))
    phone = Column(String(30))
    preferences = Column(JSONB, default={})
    metadata_ = Column("metadata", JSONB, default={})
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    wallets = relationship("UserWallet", back_populates="user", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="user")
    income_sources = relationship("IncomeSource", back_populates="user")
    portfolio = relationship("PortfolioHolding", back_populates="user")
    goals = relationship("FinancialGoal", back_populates="user")
    budgets = relationship("Budget", back_populates="user")
    chat_sessions = relationship("ChatSession", back_populates="user")


class UserWallet(Base):
    __tablename__ = "user_wallets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    wallet_type = Column(String(30), nullable=False)
    address = Column(String(200), nullable=False)
    is_primary = Column(Boolean, default=False)
    metadata_ = Column("metadata", JSONB, default={})
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    user = relationship("User", back_populates="wallets")
    wallet_transactions = relationship("WalletTransaction", back_populates="wallet")

    __table_args__ = (
        UniqueConstraint("user_id", "address", name="uq_user_wallet"),
    )


# =========================
# 2. Categories & Merchants
# =========================

class Category(Base):
    __tablename__ = "categories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    name = Column(String(100), nullable=False)
    parent_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"))
    icon = Column(String(50))
    color = Column(String(20))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    parent = relationship("Category", remote_side=[id], backref="children")

    __table_args__ = (
        UniqueConstraint("user_id", "name", name="uq_user_category"),
    )


class MerchantMaster(Base):
    __tablename__ = "merchant_master"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    canonical_name = Column(String(255), nullable=False)
    canonical_name_norm = Column(String)
    default_category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"))
    logo_url = Column(Text)
    aliases = Column(ARRAY(String), default=[])
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    transactions = relationship("Transaction", back_populates="merchant")


class MerchantCategoryMap(Base):
    __tablename__ = "merchant_category_map"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    merchant_id = Column(UUID(as_uuid=True), ForeignKey("merchant_master.id"))
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"))
    confidence = Column(Numeric(5, 2), default=1.0)
    source = Column(String(30))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    __table_args__ = (
        UniqueConstraint("user_id", "merchant_id", name="uq_user_merchant_map"),
    )


# =========================
# 3. Transactions
# =========================

class RawFinancialEvent(Base):
    __tablename__ = "raw_financial_events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    source = Column(String(30), nullable=False)
    sender = Column(String(100))
    raw_text = Column(Text, nullable=False)
    received_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    is_parsed = Column(Boolean, default=False)
    parsed_transaction_id = Column(UUID(as_uuid=True))


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    amount = Column(Numeric(18, 2), nullable=False)
    currency = Column(String(3), default="INR")
    occurred_at = Column(DateTime(timezone=True), nullable=False)
    merchant_id = Column(UUID(as_uuid=True), ForeignKey("merchant_master.id"))
    merchant_raw = Column(Text)
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"))
    source = Column(String, nullable=False)
    raw_event_id = Column(UUID(as_uuid=True), ForeignKey("raw_financial_events.id"))
    description = Column(Text)
    anomaly_score = Column(Numeric(6, 4), default=0)
    blockchain_hash = Column(String(66))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="transactions")
    merchant = relationship("MerchantMaster", back_populates="transactions")


# =========================
# 4. Income & Portfolio
# =========================

class IncomeSource(Base):
    __tablename__ = "income_sources"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    name = Column(String(255))
    source_type = Column(String)
    rate_type = Column(String, default="fixed")
    estimated_monthly_amount = Column(Numeric(18, 2))
    api_source_identifier = Column(String(100))
    is_active = Column(Boolean, default=True)

    user = relationship("User", back_populates="income_sources")
    allocations = relationship("GoalAllocation", back_populates="income_source")


class PortfolioHolding(Base):
    __tablename__ = "portfolio_holdings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    asset_type = Column(String)
    identifier = Column(String(200))
    name = Column(String(255))
    quantity = Column(Numeric(36, 12))
    avg_buy_price = Column(Numeric(30, 10))
    current_value = Column(Numeric(30, 10))
    last_api_fetch = Column(DateTime(timezone=True))
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="portfolio")
    allocations = relationship("GoalAllocation", back_populates="portfolio_holding")


# =========================
# 5. Goals & Budgets
# =========================

class FinancialGoal(Base):
    __tablename__ = "financial_goals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    name = Column(String(255))
    target_amount = Column(Numeric(18, 2))
    current_amount = Column(Numeric(18, 2), default=0)
    target_date = Column(Date)
    status = Column(String(20), default="active")
    ai_feasibility_score = Column(Numeric(5, 2))
    ai_advice_summary = Column(Text)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    user = relationship("User", back_populates="goals")
    allocations = relationship("GoalAllocation", back_populates="goal")


class GoalAllocation(Base):
    __tablename__ = "goal_allocations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    goal_id = Column(UUID(as_uuid=True), ForeignKey("financial_goals.id", ondelete="CASCADE"))
    income_source_id = Column(UUID(as_uuid=True), ForeignKey("income_sources.id"))
    portfolio_holding_id = Column(UUID(as_uuid=True), ForeignKey("portfolio_holdings.id"))
    allocation_percentage = Column(Numeric(5, 2))
    allocation_fixed_amount = Column(Numeric(18, 2))

    goal = relationship("FinancialGoal", back_populates="allocations")
    income_source = relationship("IncomeSource", back_populates="allocations")
    portfolio_holding = relationship("PortfolioHolding", back_populates="allocations")


class Budget(Base):
    __tablename__ = "budgets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"))
    limit_amount = Column(Numeric(18, 2))
    period = Column(String(20), default="monthly")
    alert_threshold = Column(Numeric(5, 2), default=80)
    is_active = Column(Boolean, default=True)

    user = relationship("User", back_populates="budgets")

    __table_args__ = (
        UniqueConstraint("user_id", "category_id", name="uq_user_budget_cat"),
    )


# =========================
# 6. AI Chat
# =========================

class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    session_name = Column(String(255))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    user = relationship("User", back_populates="chat_sessions")
    messages = relationship("ChatMessage", back_populates="session", cascade="all, delete-orphan")


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(UUID(as_uuid=True), ForeignKey("chat_sessions.id", ondelete="CASCADE"))
    sender = Column(String(10))
    content = Column(Text, nullable=False)
    embedding = Column(Vector(1536))
    context_tags = Column(JSONB, default=[])
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    session = relationship("ChatSession", back_populates="messages")


class AIExplanation(Base):
    __tablename__ = "ai_explanations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    entity_type = Column(String(50))
    entity_id = Column(UUID(as_uuid=True))
    explanation = Column(JSONB)
    model = Column(String(50))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class GoalConflict(Base):
    __tablename__ = "goal_conflicts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    month = Column(Date)
    conflict_type = Column(String(50))
    details = Column(JSONB)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
class WalletTransaction(Base):
    __tablename__ = "wallet_transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    wallet_id = Column(
        UUID(as_uuid=True),
        ForeignKey("user_wallets.id", ondelete="CASCADE"),
    )
    chain = Column(String(30))
    tx_hash = Column(String(100), nullable=False)
    amount = Column(Numeric(30, 10))
    token_symbol = Column(String(20))
    direction = Column(String(10))  # in / out
    occurred_at = Column(DateTime(timezone=True))
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    wallet = relationship("UserWallet", back_populates="wallet_transactions")

    __table_args__ = (
        UniqueConstraint("chain", "tx_hash", name="uq_chain_hash"),
    )
