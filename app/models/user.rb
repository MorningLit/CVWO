class User < ApplicationRecord
    has_secure_password

    validates_presence_of :name

    validates_presence_of :email
    validates_uniqueness_of :email

    has_many :todos
end
